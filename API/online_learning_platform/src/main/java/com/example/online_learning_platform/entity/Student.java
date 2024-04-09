package com.example.online_learning_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student")
public class Student extends EntityDoc {

    @Column(name="name")
    private String name;

    @Column(name="email")
    private String email;

    @Column(name="date_of_birth")
    private Date dateOfBirth;

    @Column(name="gender",length=10)
    private String gender;

    @Column(name="address")
    private String address;

    @Builder.Default
    @Column(name="is_active")
    private Boolean isActive=false;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

}
