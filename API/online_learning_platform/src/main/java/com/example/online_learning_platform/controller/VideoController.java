package com.example.online_learning_platform.controller;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Category;
import com.example.online_learning_platform.model.Video;
import com.example.online_learning_platform.model.VideoResponse;
import com.example.online_learning_platform.repository.VideoRepository;
import com.example.online_learning_platform.service.VideoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/online-learning-platform/auth")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @Autowired
    private VideoRepository videoRepository;

    @PostMapping("/video")
    public ResponseEntity<Object> createVideo(@RequestBody Video videoRequest){
        try{
            Video video = videoService.createVideo(videoRequest);
            return ResponseEntity.ok(video);
        } catch(NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/video/{id}")
    public ResponseEntity<Object> displayVideo(@PathVariable Long id){
        try{
            VideoResponse video = videoService.displayVideo(id);
            return ResponseEntity.ok(video);
        } catch(NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/videos")
    public ResponseEntity<Object> listOfVideos(){
        try{
            List<com.example.online_learning_platform.model.VideoResponse> videoList = videoService.listOfVideos();
            return ResponseEntity.ok(videoList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/videos-without-lesson")
    public ResponseEntity<Object> listOfVideosWithoutLesson(){
        try{
            List<com.example.online_learning_platform.model.VideoResponse> videoList = videoService.listOfVideosWithoutLesson();
            return ResponseEntity.ok(videoList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/video-file")
    public ResponseEntity<Object> createVideoByVideoUpload(@RequestPart("video") String video, @RequestPart("file") MultipartFile file) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            System.out.println("Video parameter content: " + video);
            Video videoJson = objectMapper.readValue(video, Video.class);

            Video createdCategory = videoService.createVideoByVideoUpload(videoJson,file);

            return ResponseEntity.ok(createdCategory);
        } catch (NotFoundException e) {
            return ResponseEntity.ok(e.getMessage());
        } catch (IOException e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process the request");
        }


    }

    @GetMapping("/video-file/{videoTitle}")
    public ResponseEntity<byte[]> getVideoByVideoTitle(@PathVariable String videoTitle) {
        try {
            byte[] video= videoService.getVideoByVideoTitle(videoTitle);

            // Determine the content type based on the file extension
            String contentType = determineContentType(videoTitle);

            // Set the Content-Type header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));

            return new ResponseEntity<>(video, headers, HttpStatus.OK);
        } catch (NotFoundException e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private String determineContentType(String imageName) {

        if (imageName.endsWith(".jpg") || imageName.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (imageName.endsWith(".png")) {
            return "image/png";
        } else {
            return "image/jpeg";
        }
    }


}
