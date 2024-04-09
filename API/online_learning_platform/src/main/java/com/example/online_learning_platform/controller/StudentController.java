package com.example.online_learning_platform.controller;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Student;
import com.example.online_learning_platform.service.StudentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/online-learning-platform/auth")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PutMapping("student/{id}")
    public Student updateStudent(@PathVariable Long id,@RequestBody Student updatedStudent) throws NotFoundException {
        try {
            return studentService.updateStudent(id,updatedStudent);
        } catch(NotFoundException e){
            return null;
        }
    }
}
