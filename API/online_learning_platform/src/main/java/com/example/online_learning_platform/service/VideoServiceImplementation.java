package com.example.online_learning_platform.service;

import com.example.online_learning_platform.entity.Lesson;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Video;
import com.example.online_learning_platform.model.VideoResponse;
import com.example.online_learning_platform.repository.LessonRepository;
import com.example.online_learning_platform.repository.VideoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VideoServiceImplementation implements VideoService{
    private static final String UPLOAD_DIR = "C:\\CodeBase\\daksar\\Krishna\\API\\online_learning_platform\\src\\main\\java\\com\\example\\online_learning_platform\\video";
    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public Video createVideo(Video videoRequest) throws NotFoundException{
        if(videoRequest==null){
            throw new NotFoundException("Give valid Input!");
        }
        com.example.online_learning_platform.entity.Video video=new com.example.online_learning_platform.entity.Video();
        if(videoRequest.getTitle()!=null){
            video.setTitle(videoRequest.getTitle());
        }
        if(videoRequest.getLink()!=null){
            video.setLink(videoRequest.getLink());
        }
//        Optional<Lesson> lessonOptional = lessonRepository.findById(videoRequest.getLessonId());
//        if (lessonOptional.isEmpty()){
//            throw new NotFoundException("The lesson is not found with id: "+videoRequest.getLessonId());
//        }
//        Lesson lesson=lessonOptional.get();
//        if(videoRequest.getLessonId()!=null){
//            video.setLessonId(lesson);
//        }
        video=videoRepository.save(video);

        Video videoModel = new Video();
        videoModel.setId(video.getId());
        videoModel.setTitle(video.getTitle());
        videoModel.setLink(video.getLink());
//        videoModel.setLessonId(video.getLessonId().getId());
        return videoModel;
    }

    @Override
    public VideoResponse displayVideo(Long id) throws NotFoundException{
        Optional<com.example.online_learning_platform.entity.Video> videoOptional=videoRepository.findById(id);
        if(videoOptional.isEmpty()){
            throw new NotFoundException("Video is not found with id:"+id);
        }
        Optional<Lesson> lessonOptional = lessonRepository.findById(videoOptional.get().getLessonId().getId());
        if(lessonOptional.isEmpty()){
            throw new NotFoundException("Lesson is not found with id:"+videoOptional.get().getLessonId().getId());
        }
        com.example.online_learning_platform.entity.Video videoEntity = videoOptional.get();
        VideoResponse videoModel =new VideoResponse();
        videoModel.setId(videoEntity.getId());
        videoModel.setTitle(videoEntity.getTitle());
        videoModel.setLink(videoEntity.getLink());
//        videoModel.setLessonId(videoEntity.getLessonId().getId());
        String videoLink = videoEntity.getLink();
        String videoId = extractVideoId(videoLink);
        videoModel.setVideoId(videoId);

        return videoModel;
    }
    public String extractVideoId(String videoLink) {
        // Define the pattern for extracting video ID from YouTube link
        String pattern = "(?<=watch\\?v=|/videos/|embed\\/|youtu.be\\/|\\/v\\/|\\/e\\/|watch\\?v%3D|watch\\?feature=player_embedded&v=|%2Fvideos%2F|embed%\u200C2Fvideos%\u200C|youtu.be%\u200C2F|v=|e=|watch\\?v=|youtube.com\\%2Fv%2F|youtube.com\\%2Fe%\\u200C2F|youtube.com\\%2Fembed%2F|youtube.com\\%2Fuser%2F\\[^#\\/%?]\\*\\%3Fv%3D|youtube.com\\%2Fgoogleanalytics\\%2F|youtube.com\\%2Fpair\\%2F|v=|e=|g=)([^\"&?\\/\\s]{11})";
        Pattern compiledPattern = Pattern.compile(pattern);
        Matcher matcher = compiledPattern.matcher(videoLink);

        // Extract the video ID if found
        if (matcher.find()) {
            return matcher.group();
        } else {
            return null;
        }
    }
    @Override
    public List<VideoResponse> listOfVideos(){
        List<VideoResponse> videoResponseList = new ArrayList<>();
        List<com.example.online_learning_platform.entity.Video> videos = videoRepository.findAll();

        for(com.example.online_learning_platform.entity.Video video : videos){
            VideoResponse videoResponse = new VideoResponse();
            videoResponse.setId(video.getId());
            videoResponse.setTitle(video.getTitle());
            videoResponse.setLink(video.getLink());
            String videoId = extractVideoId(video.getLink());
            videoResponse.setVideoId(videoId);
            videoResponseList.add(videoResponse);
        }
        return videoResponseList;
    }
    @Override
    public List<VideoResponse> listOfVideosWithoutLesson(){
        List<VideoResponse> videoResponseList = new ArrayList<>();
        List<com.example.online_learning_platform.entity.Video> videos = videoRepository.findAll();

        for(com.example.online_learning_platform.entity.Video video : videos){
            Lesson videoWithLesson = lessonRepository.findByVideoId(video);
            if(videoWithLesson == null){
                VideoResponse videoResponse = new VideoResponse();
                videoResponse.setId(video.getId());
                videoResponse.setTitle(video.getTitle());
                videoResponse.setLink(video.getLink());
                String videoId = extractVideoId(video.getLink());
                videoResponse.setVideoId(videoId);
                videoResponseList.add(videoResponse);
            }

        }
        return videoResponseList;
    }


    @Override
    public Video createVideoByVideoUpload(Video video, MultipartFile file) throws NotFoundException {

            if (video.getTitle() == null || video.getTitle().isEmpty())
                throw new NotFoundException("Video title should not be null or empty");

            // 1. Convert video title to lowercase and remove white spaces
            String userInputVideoTitle = video.getTitle().toLowerCase().replaceAll("\\s", "");

            List<com.example.online_learning_platform.entity.Video> videoList = videoRepository.findAll();
            // 3. Check for duplicate video titles
            for (com.example.online_learning_platform.entity.Video videoEntity : videoList) {
                if (videoEntity.getTitle().toLowerCase().replaceAll("\\s", "").equals(userInputVideoTitle)) {
                    throw new NotFoundException("Video title already exists");
                }
            }

            String videoFileName = uploadVideo(file);

            com.example.online_learning_platform.entity.Video videoNewEntity = new com.example.online_learning_platform.entity.Video();
            videoNewEntity.setTitle(video.getTitle());
            videoNewEntity.setLink(videoFileName); // Assuming link represents the video file name

            videoNewEntity = videoRepository.save(videoNewEntity);

            Video videoModel = new Video();
            BeanUtils.copyProperties(videoNewEntity, videoModel);

            return videoModel;
        }

        private String uploadVideo(MultipartFile file) {
        try{
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path targetPath = Path.of(UPLOAD_DIR, fileName);

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e){
            throw new RuntimeException("Failed to upload video", e);
        }

    }


    @Override
    public byte[] getVideoByVideoTitle(String videoTitle) throws NotFoundException {

        // Get video data as byte array
        byte[] videoData = getVideoData(videoTitle);

        return videoData;
    }

    private byte[] getVideoData(String videoTitle) {
        try {
            // Assuming video file name is the same as video title (you may need to adjust this based on your file naming conventions)
            String videoFileName = videoTitle.toLowerCase().replaceAll("\\s", "") ;
            Path videoPath = Path.of(UPLOAD_DIR, videoFileName);

            return Files.readAllBytes(videoPath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read video data", e);
        }
    }



}




