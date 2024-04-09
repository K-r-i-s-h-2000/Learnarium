package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="instructor")
public class Instructor extends EntityDoc{

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name="gender", length = 10)
    private String gender;

    @Builder.Default
    @Column(name="is_active")
    private Boolean isActive=false;

    @Column(name="website")
    private String website;

    @Column(name="description")
    private String description;


}
