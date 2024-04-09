package com.example.online_learning_platform.model;


import lombok.*;

/**
 * Model class representing an authentication request.
 *
 * <p>The `AuthenticationRequest` class contains information required for user authentication, including
 * the user's email and password.
 *
 * @author krishna.c
 * @version 1.0
 * @since 09/01/2024
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthenticationRequest {
    /**
     * The email address of the user, which serves as their unique identifier.
     */
    private String email;
    /**
     * The user's password for authentication.
     */
    private String password;
    /**
     * A message related to the authentication request.
     */
    private String message;


    public AuthenticationRequest(String userEmail, String userPassword) {
    }
}
