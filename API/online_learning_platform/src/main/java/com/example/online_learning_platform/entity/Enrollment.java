package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "enrollment")
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment extends EntityDoc {

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student studentId;

    @OneToOne
    @JoinColumn(name="course_id", referencedColumnName = "id")
    private Course courseId;

    @Column(name = "enrollment_status")
    private String enrollmentStatus;


}
