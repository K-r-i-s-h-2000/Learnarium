package com.example.online_learning_platform.controller;


import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.ChangePasswordRequest;
import com.example.online_learning_platform.model.DeletionRequest;
import com.example.online_learning_platform.service.UserServiceImplementation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Log4j2

@RestController
@RequestMapping("/online-learning-platform/users")
@RequiredArgsConstructor
@SecurityRequirement(name="onlinelearningplatform")
public class UserController {

    private final UserServiceImplementation service;

    @PostMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        boolean isSuccessful= service.changePassword(request, connectedUser);
        return ResponseEntity.ok(isSuccessful);
    }

    /**
     * Endpoint for soft deleting a customer.
     * Soft deletes a customer based on the provided ID.
     *
     * @param id The ID of the customer to be soft-deleted.
     * @return A response entity with the result of the soft delete operation.
     */
    @DeleteMapping("/soft-delete/{id}")
    public ResponseEntity<?> softDeleteCustomer(@PathVariable Long id) {
        try {
            var response = service.softDeleteUser(id);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {

            return ResponseEntity.notFound().build();
        }
    }
}
