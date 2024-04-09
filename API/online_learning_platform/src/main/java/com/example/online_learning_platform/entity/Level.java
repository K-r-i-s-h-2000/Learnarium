package com.example.online_learning_platform.entity;


import lombok.Getter;

@Getter
public enum Level {

    BEGINNER(1),

    INTERMEDIATE(2),

    ADVANCED(3);

    private final int levelId;

    /**
     * Constructs a new difficulty level with the specified level ID.
     *
     * @param levelId The ID of the difficulty level.
     */
    Level(int levelId) {
        this.levelId = levelId;
    }
}
