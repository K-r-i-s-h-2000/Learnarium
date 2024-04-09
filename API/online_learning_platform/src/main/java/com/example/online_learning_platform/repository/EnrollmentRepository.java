package com.example.online_learning_platform.repository;

import com.example.online_learning_platform.entity.Course;
import com.example.online_learning_platform.entity.Enrollment;
import com.example.online_learning_platform.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
//    @Query("SELECT e FROM Enrollment e WHERE e.studentId.id = :studentId")
    List<Enrollment> findEnrollmentsByStudentId(Student studentEntity);

    List<Enrollment> findStudentsByCourseId(Course courseEntity);

    Boolean existsByStudentIdAndCourseId(Student student,Course course);
}
