package com.example.online_learning_platform.service;


import com.example.online_learning_platform.entity.*;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.RegisterRequest;
import com.example.online_learning_platform.repository.*;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

@Service
public class EmailServiceImplementation implements EmailService {

    @Autowired
    private Session emailSession;

    @Autowired
    private EmailTemplateRepository emailTemplateRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    /**
     * Sends an email with the specified parameters using JavaMail.
     *
     * @param to      The recipient's email address.
     * @param subject The subject of the email.
     * @param body    The body/content of the email.
     * @throws MessagingException If there is an issue with sending the email.
     */

    @Override
    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = new MimeMessage(emailSession);
        message.setFrom(new InternetAddress("learnarium2024@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
    }


    /**
     * Registers a user based on the provided registration request and sends a registration email.
     *
     * @param request The registration request containing user information.
     */

    @Override
    public void registerUser(RegisterRequest request) {
        EmailTemplate emailTemplate = emailTemplateRepository.findById(1L).orElse(null);

        try {
            if (emailTemplate != null) {
                String emailSubject = emailTemplate.getSubject();
                String emailMessage = emailTemplate.getMessage();

                sendEmail(request.getEmail(), emailSubject, emailMessage);
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
    public void sendForgotPasswordEmail( RegisterRequest registerRequest) {

        EmailTemplate emailTemplate = emailTemplateRepository.findById(5L).orElse(null);
        String randomPassword = generateRandomPassword();
        try {
            if (emailTemplate != null) {
                String emailSubject = emailTemplate.getSubject();
                String emailMessage = emailTemplate.getMessage() + randomPassword;


                sendEmail(registerRequest.getEmail(), emailSubject, emailMessage);
                // Update the user's password in the database with the newly generated random password
                updatePasswordInDatabase(registerRequest.getEmail(), randomPassword);
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        // Generate a random password

    }
    private void updatePasswordInDatabase(String email, String newPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Encrypt the new password before saving it to the database
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
    }

    /**
     * Updates the status email for the specified order ID.
     *
     * @param courseId The unique identifier of the order.
     */

    @Override
    public void updateStatusEmail(@PathVariable Long courseId) throws MessagingException {
        EmailTemplate emailTemplate = emailTemplateRepository.findById(4L).orElse(null);

        Optional<Enrollment> enrollment = enrollmentRepository.findById(courseId);

        Student student = enrollment.get().getStudentId();

//
//        try{
//            restaurantService.updatePreparationStatus(orderId);

            if (emailTemplate != null) {
                String emailSubject = emailTemplate.getSubject();
                String emailMessage = emailTemplate.getMessage();

                sendEmail(student.getUser().getEmail(), emailSubject, emailMessage);
            }



//
//        }catch (MessagingException | NotFoundException e) {
//            e.printStackTrace();
//
//        }
    }

    /**
     * Sends order confirmation emails to the customer and the restaurant.
     *
     * @param newEnrollment The order for which the confirmation email should be sent.
     * @return The updated order object.
     * @throws NotFoundException If the order is not found.
     */

    @Override
    public com.example.online_learning_platform.model.Enrollment enrollmentConfirmationEmail(com.example.online_learning_platform.model.Enrollment newEnrollment) throws NotFoundException {
        com.example.online_learning_platform.model.Enrollment createdEnrollment = enrollmentService.enrolledCourse(newEnrollment.getStudentId(),newEnrollment.getCourseId());

        try {
            EmailTemplate emailTemplate = emailTemplateRepository.findById(3L).orElse(null);

            if (emailTemplate != null) {
                String emailMessage = emailTemplate.getMessage();

                emailMessage = emailMessage.replace("\\n", "\n");
                emailMessage = emailMessage.replace("\\n\\n", "\n\n");


                Course course = courseRepository.findById(newEnrollment.getCourseId())
                        .orElseThrow(() -> new NotFoundException("Course not found"));

                Student student = studentRepository.findById(newEnrollment.getStudentId())
                        .orElseThrow(() -> new NotFoundException("Student not found"));

                StringBuilder courseDetails = new StringBuilder();

                    courseDetails.append("- ").append(course.getTitle()).append(": ");
                    courseDetails.append("Rs").append(course.getFees()).append("\n");


                Instructor instructor = course.getInstructor();

                emailMessage = emailMessage.replace("[StudentName]", student.getUser().getFirstname());
                emailMessage = emailMessage.replace("[CourseDetails]", courseDetails.toString());
                emailMessage = emailMessage.replace("[ShippingAddress]", student.getUser().getFirstname() + "\n" + student.getAddress());
                emailMessage = emailMessage.replace("[TotalCost]", "Rs " + course.getFees());

                String emailSubject = emailTemplate.getSubject();
                String instructorEmailSubject = "New Student Enrolled";


                sendEmail(student.getUser().getEmail(), emailSubject, emailMessage);
                sendEmail(instructor.getUser().getEmail(), instructorEmailSubject, emailMessage);
            }

        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return createdEnrollment;
    }


    /**
     * Generates a random password.
     *
     * @return The randomly generated password.
     */

    public String generateRandomPassword() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[10];
        secureRandom.nextBytes(randomBytes);
        return Base64.getEncoder().encodeToString(randomBytes);
    }

}