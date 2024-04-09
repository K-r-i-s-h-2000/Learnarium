package com.example.online_learning_platform.controller;


import com.example.online_learning_platform.config.JwtService;
import com.example.online_learning_platform.entity.User;
import com.example.online_learning_platform.exception.EmptyInputException;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.AuthenticationRequest;
import com.example.online_learning_platform.model.AuthenticationResponse;
import com.example.online_learning_platform.model.RegisterRequest;
import com.example.online_learning_platform.repository.UserRepository;
import com.example.online_learning_platform.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

/**
 * Controller for handling authentication and user registration.
 * This controller provides endpoints for user registration, authentication, and user deletion.
 *
 * Author: ajay.S
 * Since: 31/10/2023
 * Version: 2.0
 */
@Log4j2
@RestController
@RequestMapping("/online-learning-platform/auth")
//@CrossOrigin("*")
@RequiredArgsConstructor
@SecurityRequirement(name="online-learning-platform")
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;
    @Autowired
    private LogoutHandler logoutHandler;
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;


    /**
     * Endpoint for user registration.
     * Registers a user based on the provided registration request.
     *
     * @param request The registration request.
     * @return A response entity with the authentication response.

     */
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) throws EmptyInputException {
        try {
//            emailService.registerUser(request);
            return ResponseEntity.ok(service.register(request));
        }  catch (Exception e) {
            return ResponseEntity.ok("Failed to register. Please provide valid input.");
        }
    }
    @PostMapping("/forgot-password")
    public boolean forgotPassword(@RequestBody RegisterRequest request) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

            if (optionalUser.isPresent()) {
//                emailService.sendForgotPasswordEmail(request);
                return true;
            }
            else{
                return false;
            }
        }  catch (Exception e) {
            return ResponseEntity.ok("Failed.").hasBody();
        }
    }


    /**
     * Endpoint for user authentication.
     * Authenticates a user based on the provided authentication request.
     *
     * @param request The authentication request.
     * @return A response entity with the authentication response.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse>authenticate(
            @RequestBody AuthenticationRequest request
    )
    {
        return ResponseEntity.ok(service.authenticate(request));
    }
    /**
     * Endpoint for soft deleting a customer.
     * Soft deletes a customer based on the provided ID.
     *
     * @param id The ID of the customer to be soft-deleted.
     * @return A response entity with the result of the soft delete operation.
     */
    @DeleteMapping("/soft-delete/{id}")
    public ResponseEntity<String> softDeleteStudent(@PathVariable Long id) {
        try {
            String response = service.softDeleteUser(id);
            log.info("Delete for User with ID " + id + " was successful.");
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            log.error(" User not found for ID " + id + ": " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }



//    @PostMapping("/logout")
//    public void logout(HttpServletRequest request, HttpServletResponse response) {
//        // Invoke the LogoutService to perform logout actions
//        logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
//    }


//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        service.refreshToken(request, response);
//    }
}

