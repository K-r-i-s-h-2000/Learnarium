package com.example.online_learning_platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequest {
    private Long id;
    private Long instructor;
    private String title;
    private String description;
    private List<Lesson> lessons;
    private int level;
    private Long categoryId;
    private Long fees;
}
