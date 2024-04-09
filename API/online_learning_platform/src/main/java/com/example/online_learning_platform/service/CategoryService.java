package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(Category category) throws NotFoundException;

    Category getCategoryWithId(Long id) throws NotFoundException;

    List<Category> getAllCategory();

    Category updateCategoryById(Long id, Category updatedCategory) throws NotFoundException;

    String softDeleteCategoryById(Long id) throws NotFoundException;
}
