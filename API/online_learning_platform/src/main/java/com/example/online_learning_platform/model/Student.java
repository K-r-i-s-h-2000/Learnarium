package com.example.online_learning_platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private Long id;

    private String studentName;

    private String studentEmail;

    private String studentAddress;

    private Date studentDateOfBirth;

    private String studentGender;


}
