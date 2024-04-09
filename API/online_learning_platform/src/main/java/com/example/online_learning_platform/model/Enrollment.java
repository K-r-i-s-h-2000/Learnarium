package com.example.online_learning_platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment {
    private Long studentId;
    private Long courseId;
    private String enrollmentStatus;
}
