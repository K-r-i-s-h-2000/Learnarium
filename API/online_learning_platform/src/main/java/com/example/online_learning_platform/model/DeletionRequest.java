package com.example.online_learning_platform.model;

import lombok.*;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class DeletionRequest {
    /**
     * The email associated with the deletion request.
     */
    private String email;
    /**
     * An optional message related to the deletion request.
     */
    private String message;
}