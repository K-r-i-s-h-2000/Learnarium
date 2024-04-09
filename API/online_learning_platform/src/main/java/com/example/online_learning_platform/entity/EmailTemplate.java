package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="email_template")
public class EmailTemplate{

    /**
     * Unique identifier for the email template.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Subject of the email template.
     */
    private String subject;

    /**
     * Message content of the email template.
     * The column definition is set to "TEXT" to accommodate longer text values.
     */
    @Column(columnDefinition = "TEXT")
    private String message;

}
