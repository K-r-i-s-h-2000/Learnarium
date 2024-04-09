package com.example.online_learning_platform.service;


import com.example.online_learning_platform.exception.EmptyInputException;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.AuthenticationRequest;
import com.example.online_learning_platform.model.AuthenticationResponse;
import com.example.online_learning_platform.model.DeletionRequest;
import com.example.online_learning_platform.model.RegisterRequest;
import org.springframework.http.ResponseEntity;

/**
 * Service interface for authentication and user registration.
 *  @author krishna.c
 *  @version 2.0
 *  @since 09/01/2024
 */
public interface AuthenticationService {

    public AuthenticationResponse register(RegisterRequest request) throws EmptyInputException;

    public AuthenticationResponse authenticate(AuthenticationRequest request);

    String softDeleteUser(Long id) throws NotFoundException;
}
