package com.example.online_learning_platform.entity;

import lombok.Getter;

@Getter
public enum Role {

    STUDENT(1),

    INSTRUCTOR(2),

    ADMIN(3);

    private final int roleId;
    /**
     * Constructs a new role with the specified role ID.
     *
     * @param roleId The ID of the role.
     */
    Role(int roleId) {
        this.roleId = roleId;
    }
}
