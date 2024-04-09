package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Student;

public interface StudentService {
    Student updateStudent(Long id, Student updatedStudent) throws NotFoundException;
}
