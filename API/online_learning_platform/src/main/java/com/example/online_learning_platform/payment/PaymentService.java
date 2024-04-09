package com.example.online_learning_platform.payment;

import com.example.online_learning_platform.entity.Course;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.payment.Payment;
import com.example.online_learning_platform.payment.PaymentRepository;
import com.example.online_learning_platform.repository.CourseRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class PaymentService  {
    @SuppressWarnings("unused")
    @Value("${stripe.api.key}")
    private String stripeApiKey;
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CourseRepository courseRepository;


    public boolean processPayment(String cardNumber, String expirationDate, String cvv,Long courseId) {


        Stripe.apiKey = stripeApiKey;
        Optional<Course> course = courseRepository.findById(courseId);
        if(course.isEmpty())
        {
            throw new NotFoundException("Invalid Course id");
        }
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) ((course.get().getFees()) * 100))
                    .setCurrency("inr")
                    .setPaymentMethod("pm_card_visa")
                    .setConfirm(true)
                    .setOffSession(true)
                    .setDescription("Payment")

                    .setCustomer("cus_Ozy82IRLJuOP9O")
                    .setReturnUrl("http://localhost:8080/online-learning-platform/auth/payments/payment/success")
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            String status = intent.getStatus();
            String paymentIntentId = intent.getId();
            String clientSecret = intent.getClientSecret();
            System.out.println("Client Secret: " + clientSecret);
            System.out.println(paymentIntentId);

            if ("requires_action".equals(status)) {
                // The payment method requires customer action, so return a flag indicating that
                // Extract the redirect URL and print it
                String redirectUrl = intent.getNextAction().getRedirectToUrl().getUrl();
                System.out.println("Redirect URL: " + redirectUrl);
                return false;
            } else if ("requires_payment_method".equals(status)) {
                // Handle the case where a different payment method is required
                // You might prompt the user to enter another card or payment method
                System.out.println("Payment requires a different payment method.");
                return false;
            } else if ("succeeded".equals(status)) {
                // Payment was already succeeded
                System.out.println("Payment was already succeeded.");
                return true;  // or handle accordingly based on your use case
            }

            // Confirm the payment intent
            PaymentIntent confirmedIntent = intent.confirm();

            Payment payment = new Payment();
            payment.setCardNumber(cardNumber);
            payment.setExpirationDate(expirationDate);
            payment.setCvv(cvv);
            payment.setAmount(course.get().getFees());

            if ("succeeded".equals(confirmedIntent.getStatus())) {
                // Payment was successful
                payment.setSuccess(true);
            } else {
                // Payment failed
                payment.setSuccess(false);
                System.out.println("Payment failed with status: " + confirmedIntent.getStatus());
            }

            // Save the payment to the database
            paymentRepository.save(payment);

            return payment.isSuccess();
        } catch (StripeException e) {
            e.printStackTrace();
            return false;
        }
    }


//    public boolean processPayment(String cardNumber, String expirationDate, String cvv, double amount) {
//        Stripe.apiKey = stripeApiKey;
//        try {
//            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                    .setAmount((long) (amount * 100))
//                    .setCurrency("usd")
//                    .setPaymentMethod("pm_card_visa")
//                    .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.MANUAL)
//                    .setConfirm(true)
//                    .setReturnUrl("http://localhost:8080/dummy-return")  // Use a placeholder return URL
//                    .build();
//
//            PaymentIntent intent = PaymentIntent.create(params);
//            PaymentIntent intent1 = intent.confirm();
//
//
//            Payment payment = new Payment();
//            payment.setCardNumber(cardNumber);
//            payment.setExpirationDate(expirationDate);
//            payment.setCvv(cvv);
//            payment.setAmount(amount);
//            //payment.setSuccess("succeeded".equals(intent.getStatus()));
//
//
//
//
//            paymentRepository.save(payment);
//
//            return payment.isSuccess();
//        } catch (StripeException e) {
//            e.printStackTrace();
//            return false;
//        }
//    }



    // Add a method for refunding payments using Stripe
}

