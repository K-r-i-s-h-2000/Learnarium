package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Category;
import com.example.online_learning_platform.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImplementation implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category createCategory(Category category) throws NotFoundException{
        if(category.getCategoryName()==null | category.getCategoryName().isEmpty())
            throw new NotFoundException("Category name should not be null or empty ");
        String userInputCategoryName = category.getCategoryName().toLowerCase().replaceAll("\\s","");

        List<com.example.online_learning_platform.entity.Category> activeCategories = categoryRepository.findByIsActive(true);

        for(com.example.online_learning_platform.entity.Category activeCategory : activeCategories){
            if(activeCategory.getCatergoryName().toLowerCase().replaceAll("\\s","").equals(userInputCategoryName)){
                throw new NotFoundException("Category name already exists");

            }
        }
        com.example.online_learning_platform.entity.Category categoryEntity = new com.example.online_learning_platform.entity.Category();
        categoryEntity.setCatergoryName(category.getCategoryName());
        categoryEntity.setImage(category.getImage());
        categoryEntity.setIsActive(true);

        categoryEntity=categoryRepository.save(categoryEntity);

        Category categoryModel = new Category();
        categoryModel.setId(categoryEntity.getId());
        categoryModel.setCategoryName(categoryEntity.getCatergoryName());
        categoryModel.setImage(categoryEntity.getImage());
        return categoryModel;
    }

    @Override
    public Category getCategoryWithId(Long id) throws NotFoundException {

        Optional<com.example.online_learning_platform.entity.Category> categoryEntityWrapper = categoryRepository.findById(id);
        if (categoryEntityWrapper.isEmpty()) {
            throw new NotFoundException("Category is not found with id: " + id);
        }

        com.example.online_learning_platform.entity.Category categoryEntity = categoryEntityWrapper.get();

        if (!categoryEntity.getIsActive()) {
            throw new NotFoundException("Category is not active with id: " + id);
        }

        Category categoryModel = new Category();
        categoryModel.setId(categoryEntity.getId());
        categoryModel.setCategoryName(categoryEntity.getCatergoryName());
        categoryModel.setImage(categoryEntity.getImage());

        return categoryModel;

    }

    @Override
    public List<Category> getAllCategory() {

        List<Category> categoryModelList = new ArrayList<>();

        List<com.example.online_learning_platform.entity.Category> categories = categoryRepository.findAll();

        for (com.example.online_learning_platform.entity.Category category : categories) {
            if (category.getIsActive()) {
                Category categoryModel = new Category();
                categoryModel.setId(category.getId());
                categoryModel.setCategoryName(category.getCatergoryName());
                categoryModel.setImage(category.getImage());
                categoryModelList.add(categoryModel);
            }
        }
        return categoryModelList;
    }

    @Override
    public Category updateCategoryById(Long id, Category updatedCategory) throws NotFoundException {

        Optional<com.example.online_learning_platform.entity.Category> categoryEntityOptional = categoryRepository.findById(id);

        if (categoryEntityOptional.isEmpty()) {
            throw new NotFoundException("Category not found with ID: " + id);
        }

        com.example.online_learning_platform.entity.Category categoryEntity = categoryEntityOptional.get();

        if (categoryEntity.getIsActive()) {

            // 1. Convert updated category name to lowercase and remove white spaces
            String updatedCategoryName = updatedCategory.getCategoryName().toLowerCase().replaceAll("\\s", "");

            // 2. Get all active categories from DB and process their names
            List<com.example.online_learning_platform.entity.Category> activeCategories = categoryRepository.findByIsActive(true);
            for (com.example.online_learning_platform.entity.Category activeCategory : activeCategories) {
                // Convert category name to lowercase and remove white spaces
                String activeCategoryName = activeCategory.getCatergoryName().toLowerCase().replaceAll("\\s", "");

                // 3. Check for a match excluding the current category being updated
                if (!activeCategory.getId().equals(id) && activeCategoryName.equals(updatedCategoryName)) {
                    throw new NotFoundException("Category name '" + updatedCategory.getCategoryName() + "' already exists.");
                }
            }


            if (updatedCategory.getCategoryName() != null && !updatedCategory.getCategoryName().isEmpty()) {
                categoryEntity.setCatergoryName(updatedCategory.getCategoryName());

                categoryEntity = categoryRepository.save(categoryEntity);

                Category categoryModel = new Category();
                categoryModel.setId(categoryEntity.getId());
                categoryModel.setCategoryName(categoryEntity.getCatergoryName());
                categoryModel.setImage(categoryEntity.getImage());
                return categoryModel;

            } else {
                throw new NotFoundException("Category name and image url must be provided properly for the update");
            }
        } else {
            throw new NotFoundException("Cannot update an inactive category");
        }
    }
    @Override
    public String softDeleteCategoryById(Long id) throws NotFoundException {

        com.example.online_learning_platform.entity.Category entity = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category with ID " + id + " not found"));
        entity.setIsActive(false);
        categoryRepository.save(entity);
        return "Category With Id "+id+" deleted successfully!";
    }

}
