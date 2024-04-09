package com.example.online_learning_platform.controller;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Course;
import com.example.online_learning_platform.model.CourseRequest;
import com.example.online_learning_platform.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/online-learning-platform/auth")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/course")
    public ResponseEntity<Object> createCourse(@RequestBody CourseRequest course){
        try{
            Course createdCourse = courseService.createCourse(course);
            return ResponseEntity.ok(createdCourse);
        } catch(NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check-title-availability/{title}")
    public boolean checkTitleAvailability(@PathVariable String title){
        return courseService.checkTitleAvailability(title);
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<Object> displayCourse(@PathVariable Long id) throws NotFoundException{
        try{
            Course course = courseService.displayCourse(id);
            return ResponseEntity.ok(course);
        } catch(NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/course")
    public ResponseEntity<Object> addLesson(@RequestBody CourseRequest courseRequest) throws NotFoundException{
        try {
            Course updatedCourse = courseService.addLesson(courseRequest);
            return ResponseEntity.ok(updatedCourse);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/courses")
    public ResponseEntity<Object> getAllCourses(){
        try{
            List<Course> courseList = courseService.getAllCourses();
            return ResponseEntity.ok(courseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/courses-with-zero-fees")
    public ResponseEntity<Object> getAllCoursesWithZeroFees(){
        try{
            List<Course> courseList = courseService.getAllCourseswithZeroFees();
            return ResponseEntity.ok(courseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/course/category/{categoryId}")
    public ResponseEntity<Object> getAllCourseByCategory(@PathVariable Long categoryId){
        try{
            List<Course> courseList = courseService.getAllCourseByCategory(categoryId);
            return ResponseEntity.ok(courseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/course/instructor/{instructorId}")
    public ResponseEntity<Object> getCourseByInstructor(@PathVariable Long instructorId){
        try {
            List<Course> courseList=courseService.getCourseByInstructor(instructorId);
            return ResponseEntity.ok(courseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
