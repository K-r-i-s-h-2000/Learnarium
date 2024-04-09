package com.example.online_learning_platform.repository;

import com.example.online_learning_platform.entity.Lesson;
import com.example.online_learning_platform.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson,Long> {

    Lesson findByVideoId(Video videoId);

}
