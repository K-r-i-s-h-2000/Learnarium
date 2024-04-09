package com.example.online_learning_platform.payment;

import com.example.online_learning_platform.entity.EntityDoc;
import lombok.*;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
@Builder
public class Payment extends EntityDoc {
    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "expiration_date")
    private String expirationDate;

    @Column(name = "cvv")
    private String cvv;

    @Column(name = "amount")
    private double amount;

    @Column(name = "success")
    private boolean success;


}
