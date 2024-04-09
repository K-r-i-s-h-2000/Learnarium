package com.example.online_learning_platform.repository;

import com.example.online_learning_platform.entity.Category;
import com.example.online_learning_platform.entity.Course;
import com.example.online_learning_platform.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findByCategory(Category categoryEntity);

    List<Course> findByInstructor(Instructor instructorEntity);
}
