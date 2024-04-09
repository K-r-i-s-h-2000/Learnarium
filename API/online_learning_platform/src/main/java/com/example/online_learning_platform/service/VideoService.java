package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Video;
import com.example.online_learning_platform.model.VideoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {
    Video createVideo(Video videoRequest) throws NotFoundException;

    VideoResponse displayVideo(Long id) throws NotFoundException;

    List<VideoResponse> listOfVideos();

    List<VideoResponse> listOfVideosWithoutLesson();

    Video createVideoByVideoUpload(Video video, MultipartFile file) throws NotFoundException;


    byte[] getVideoByVideoTitle(String videoTitle) throws NotFoundException;
}
