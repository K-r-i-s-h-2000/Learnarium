package com.example.online_learning_platform.service;

import com.example.online_learning_platform.entity.Student;
import com.example.online_learning_platform.entity.User;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.ChangePasswordRequest;
import com.example.online_learning_platform.model.DeletionRequest;
import com.example.online_learning_platform.repository.StudentRepository;
import com.example.online_learning_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Log4j2

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService{
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;

    public boolean changePassword(ChangePasswordRequest request, Principal connectedUser) {
        try {
            var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

            // check if the current password is correct
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new IllegalStateException("Wrong password");
            }
            // check if the two new passwords are the same
            if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
                throw new IllegalStateException("Password are not the same");
            }

            // update the password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));

            // save the new password
            userRepository.save(user);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
    /**
     * Delete a user by their email.
     *
     * @param email The email of the user to be deleted.
     * @return A deletion request indicating the success or failure of the operation.
     */
    public DeletionRequest deleteUser(String email) {
        try {

            log.info("Deleting user with email: " + email);
            // Check if the order exists
            Optional<User> optionalOrder = userRepository.findByEmail(email);

            DeletionRequest response = new DeletionRequest();

            if (optionalOrder.isPresent()) {
                User user = optionalOrder.get();

                // Delete the order
                userRepository.delete(user);

                // Set response details for successful deletion
                response.setEmail(user.getEmail());
                response.setMessage("Customer deleted successfully");
            } else {
                // Set response details for order not found
                response.setEmail(email);
                response.setMessage("Customer not found");
            }

            return response;
        }catch (Exception e) {
            log.error("Error during user deletion: " + e.getMessage(), e);
            throw e;
        }
    }
    @Override
    public Boolean softDeleteUser(Long id) throws NotFoundException {
        try {
            log.info("Entered softDeleteUser method");
            User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User with ID " + id + " not found"));
            user.setIsActive(false);

            Student student = user.getStudent();
            if (student != null) {
                student.setIsActive(false);
                studentRepository.save(student);
            }

            // Save the updated user
            userRepository.save(user);
            return true;



        } catch (Exception e) {
            log.error("Error during softDeleteUser: " + e.getMessage(), e);
            throw e;
        }
    }



}