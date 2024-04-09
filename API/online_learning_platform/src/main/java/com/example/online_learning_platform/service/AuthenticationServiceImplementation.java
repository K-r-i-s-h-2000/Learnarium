package com.example.online_learning_platform.service;

import com.example.online_learning_platform.config.JwtService;
import com.example.online_learning_platform.entity.Instructor;
import com.example.online_learning_platform.entity.Role;
import com.example.online_learning_platform.entity.Student;
import com.example.online_learning_platform.entity.User;
import com.example.online_learning_platform.exception.EmptyInputException;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.AuthenticationRequest;
import com.example.online_learning_platform.model.AuthenticationResponse;
import com.example.online_learning_platform.model.RegisterRequest;
import com.example.online_learning_platform.repository.InstructorRepository;
import com.example.online_learning_platform.repository.StudentRepository;
import com.example.online_learning_platform.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

/**
 * Service class that handles user authentication, registration, and token generation.
 * @author ajay.S
 * @version 2.0
 * @since 31/10/2023
 */
@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationServiceImplementation implements AuthenticationService {



    /**
     * Service for JWT token operations.
     */
    @Autowired
    private JwtService jwtService;
    /**
     * Password encoder for securing user passwords.
     */
    @Autowired
    private  PasswordEncoder passwordEncoder;

    /**
     * Authentication manager for user authentication.
     */
    @Autowired
    private  AuthenticationManager authenticationManager;
    /**
     * Repository for customer data.
     */
    @Autowired
    private StudentRepository studentRepository;
    /**
     * Repository for restaurant data.
     */
    @Autowired
    private InstructorRepository instructorRepository;
    /**
     * Repository for user data.
     */
    @Autowired
    private UserRepository userRepository;




    /**
     * Register a new user with the provided details.
     *
     * @param request The registration request containing user details.
     * @return An authentication response with a registration message.
     */
    public AuthenticationResponse register(RegisterRequest request) throws EmptyInputException {
        try {
            log.info("Entered register method");
            int roleValue = request.getRole();
            Role userRole;
            if (roleValue == 1) {
                userRole = Role.STUDENT;
            } else if (roleValue == 2) {
                userRole = Role.INSTRUCTOR;

            } else {
                // Handle the case where the role is not recognized
                throw new IllegalArgumentException("Invalid role value");
            }

            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

            if ((optionalUser.isPresent() &&  !optionalUser.get().getIsActive()) || optionalUser.isEmpty() )  {



                var user = User.builder()
                        .firstname(request.getFirstname())
                        .lastname(request.getLastname())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(userRole)
                        .isActive(true)
                        .build();

                User savedUser = userRepository.save(user);


                if (roleValue == 1) {


                    Student student = Student.builder()
                            .address(request.getStudent().getStudentAddress())
                            .dateOfBirth(request.getStudent().getStudentDateOfBirth())
                            .gender(request.getStudent().getStudentGender())
                            .user(savedUser)
                            .isActive(true)
                            .build();

                    studentRepository.save(student);
                } else {
                    Instructor instructor = Instructor.builder()
                            .website(request.getInstructor().getWebsite())
                            .description(request.getInstructor().getInstructorDescription())
                            .gender(request.getInstructor().getInstructorGender())
                            .user(savedUser)
                            .isActive(true)
                            .build();
                    instructorRepository.save(instructor);


                }

                var jwtToken = jwtService.generateToken(savedUser);
                return AuthenticationResponse.builder()
                        .message("Registration Completed Successfully")

                        .build();

            } else {
                // User already exists or is active
                return AuthenticationResponse.builder()
                        .message("User with the provided email already exists or is active.")
                        .build();
            }
        }
        catch (Exception e) {
            log.error("Error during registration: " + e.getMessage(), e);
            throw e;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            log.info("Received an authentication request");

            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

            if ((optionalUser.isPresent()) && (optionalUser.get().getIsActive())) {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
                );

                User user = optionalUser.get();

                var jwtToken = jwtService.generateToken(user);
                user.setAuthenticationToken(jwtToken);
                userRepository.save(user);

                if (user.getRole() == Role.STUDENT) {
                    return AuthenticationResponse.builder()
                            .id(user.getId())
                            .token(jwtToken)
                            .message("Token is Generated")
                            .role(user.getRole())
                            .studentId(user.getStudent().getId())
                            .studentAddress(user.getStudent().getAddress())
                            .build();
                } else if (user.getRole() == Role.INSTRUCTOR) {
                    return AuthenticationResponse.builder()
                            .token(jwtToken)
                            .message("Token is Generated")
                            .role(user.getRole())
                            .instructorId(user.getInstructor().getId())
                            .instructorDescription(user.getInstructor().getDescription())
                            .build();
                }

                    return AuthenticationResponse.builder()
                            .token(jwtToken)
                            .message("Token is Generated")
                            .role(user.getRole())
                            .build();


            } else {
                log.warn("User not found with email: " + request.getEmail());
                // Handle the case where the user is not found, e.g., throw a custom exception or return an error message.
                throw new UsernameNotFoundException("User not found with email: " + request.getEmail());

            }
        } catch (Exception e) {
            log.error("Error during authentication: " + e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public String softDeleteUser(Long id) throws NotFoundException {
        try {
            log.info("Entered softDeleteUser method");
            User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User with ID " + id + " not found"));
            user.setIsActive(false);

            Student student = user.getStudent();
            if (student != null) {
                student.setIsActive(false);
                // Save the updated customer
                studentRepository.save(student);
            }

            // Save the updated user
            userRepository.save(user);


            return "User With Id "+id+" deleted successfully!";

        } catch (Exception e) {
            log.error("Error during softDeleteUser: " + e.getMessage(), e);
            throw e;
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(RegisterRequest registerRequest){
        try {
            // Search for the user by email in the repository
            Optional<User> optionalUser = userRepository.findByEmail(registerRequest.getEmail());



        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update password");
        }
        return null;
    }

}



