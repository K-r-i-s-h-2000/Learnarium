package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;

public interface UserService {

    Boolean softDeleteUser(Long id) throws NotFoundException;
}
