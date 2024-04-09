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
public class Course {

    private Long id;
    private Long instructor;
    private String title;
    private String description;
    private List<Lesson> lessons;
    private String level;
    private Long categoryId;
    private Long fees;
}
