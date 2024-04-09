package com.example.online_learning_platform.controller;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Course;
import com.example.online_learning_platform.model.Enrollment;
import com.example.online_learning_platform.model.Student;
import com.example.online_learning_platform.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/online-learning-platform/auth")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/enrollment/{studentId}/course")
    public ResponseEntity<Object> enrolledCourse(@PathVariable Long studentId, @RequestParam Long courseId){
        try {
            Enrollment enrollment = enrollmentService.enrolledCourse(studentId,courseId);
            return ResponseEntity.ok(enrollment);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/enrollment/{studentId}")
    public ResponseEntity<Object> enrolledCoursesByStudentId(@PathVariable Long studentId){
        try {
            List<Course> enrolledCourses = enrollmentService.enrolledCoursesByStudentId(studentId);
            return ResponseEntity.ok(enrolledCourses);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/enrollment/instructor/{courseId}")
    public ResponseEntity<Object> listOfStudentEnrolled(@PathVariable Long courseId){
        try{
            List<Student> enrolledStudents = enrollmentService.listOfStudentEnrolled(courseId);
            return ResponseEntity.ok(enrolledStudents);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
