package com.example.online_learning_platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Video {
    private Long id;
    private String title;
    private String link;
//    private Long lessonId;
}
