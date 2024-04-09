package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Course;
import com.example.online_learning_platform.model.Enrollment;

import java.util.List;

public interface EnrollmentService {
    Enrollment enrolledCourse(Long studentId, Long courseId) throws NotFoundException;

    List<Course> enrolledCoursesByStudentId(Long studentId);

    List<com.example.online_learning_platform.model.Student> listOfStudentEnrolled(Long courseId);
}
