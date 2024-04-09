package com.example.online_learning_platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category extends EntityDoc{
    @Column(name="category_name")
    private String catergoryName;

    @Column(name="is_active")
    private Boolean isActive=false;

    @Column(name="image_path")
    private String image;

}
