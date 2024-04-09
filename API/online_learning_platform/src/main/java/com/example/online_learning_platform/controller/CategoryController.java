package com.example.online_learning_platform.controller;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Category;
import com.example.online_learning_platform.repository.CategoryRepository;
import com.example.online_learning_platform.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/online-learning-platform/auth")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/category")
    public ResponseEntity<Object> createCategory(@RequestBody Category category){
      try{
          Category createdCategory = categoryService.createCategory(category);
          return ResponseEntity.ok(createdCategory);
      } catch(NotFoundException e){
          return ResponseEntity.badRequest().body(e.getMessage());
      }
    }
    @GetMapping("/category/{id}")
    public ResponseEntity<Object> getCategoryWithId(@PathVariable Long id){
        try{
            Category category=categoryService.getCategoryWithId(id);
            return ResponseEntity.ok(category);
        } catch(NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<Object> getAllCategory(){
        try{
            List<Category> categoryList = categoryService.getAllCategory();
            return ResponseEntity.ok(categoryList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/category/{id}")
    public ResponseEntity<Object> updateCategoryById(@PathVariable Long id,@RequestBody Category updatedCategory) {
        try{
            Category category=categoryService.updateCategoryById(id,updatedCategory);
            return ResponseEntity.ok(category);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/category/{id}")
    public Boolean softDeleteCategoryById(@PathVariable Long id) {
        try {
            categoryService.softDeleteCategoryById(id);
            return true;
        } catch (NotFoundException e) {
            return false;
        }
    }

}
