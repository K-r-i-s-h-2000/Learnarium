package com.example.online_learning_platform.model;


import com.example.online_learning_platform.entity.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

/**
 * Model class representing an authentication response.
 *
 * <p>The `AuthenticationResponse` class contains information returned as a response to an authentication request,
 * including an authentication token and an optional message.
 *
 * @author ajay.S
 * @version 2.0
 * @since 31/10/2023
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    /**
     * The authentication token provided upon successful authentication.
     */
    private String token;
    private  Long id;
    private  Long studentId;
    private Role role;
    private String studentAddress;
    /**
     * An optional message related to the authentication response.
     */
    private String message;

    private Long instructorId;

    private String studentName;

    private String instructorName;
    private String instructorDescription;


}
