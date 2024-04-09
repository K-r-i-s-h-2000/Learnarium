package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "course")
@NoArgsConstructor
@AllArgsConstructor
public class Course extends EntityDoc {

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="is_active")
    private Boolean isActive=false;

    @Column(name="fees")
    private Long fees;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Transient
    private int difficultyLevelValue;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name="instructor_id")
    private Instructor instructor;

    @OneToMany(mappedBy = "course", cascade=CascadeType.ALL)
    private List<Lesson> lessons;


}
