package com.example.online_learning_platform.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {
    private Long id;
    private String title;
    private String description;
    private Long videoId;
    private String youtubeVideoId;

}
