package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Course;
import com.example.online_learning_platform.model.CourseRequest;

import java.util.List;

public interface CourseService {


    Course createCourse(CourseRequest courseRequest) throws NotFoundException;

    Course displayCourse(Long id) throws NotFoundException;

    Course addLesson(CourseRequest courseRequest) throws NotFoundException;

    List<Course> getAllCourses();

    boolean checkTitleAvailability(String title);

    List<Course> getAllCourseswithZeroFees();

    List<Course> getAllCourseByCategory(Long categoryId);

    List<Course> getCourseByInstructor(Long instructorId);
}
