package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="lesson")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Lesson extends EntityDoc{

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "is_active")
    private Boolean isActive=false;

    @OneToOne
    @JoinColumn(name="video_id")
    private Video videoId;


}
