package com.example.online_learning_platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {

    private Long id;

    private String instructorName;

    private String instructorEmail;

    private String website;

    private String instructorDescription;

    private String instructorGender;
}
