package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="video")
public class Video extends EntityDoc {

    @Column(name = "title")
    private String title;

    @Column(name="video_link")
    private String link;

    @OneToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lessonId;


}
