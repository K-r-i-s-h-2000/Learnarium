package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.RegisterRequest;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.PathVariable;

public interface EmailService {

    void sendEmail(String to, String subject, String body) throws MessagingException;

    void registerUser(RegisterRequest request);

    void updateStatusEmail(@PathVariable Long courseId) throws MessagingException;

    com.example.online_learning_platform.model.Enrollment enrollmentConfirmationEmail(com.example.online_learning_platform.model.Enrollment newEnrollment) throws NotFoundException;
}
