package com.example.online_learning_platform.service;

import com.example.online_learning_platform.entity.*;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Course;
import com.example.online_learning_platform.model.CourseRequest;
import com.example.online_learning_platform.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseServiceImplementation implements CourseService {
     @Autowired
     private CourseRepository courseRepository;

     @Autowired
     private LessonRepository lessonRepository;

     @Autowired
     private InstructorRepository instructorRepository;

     @Autowired
     private CategoryRepository categoryRepository;
     @Autowired
     private VideoRepository videoRepository;

     @Autowired
     private VideoServiceImplementation videoServiceImplementation;

     @Override
     public Course createCourse(CourseRequest courseRequest) throws NotFoundException {
          Optional<com.example.online_learning_platform.entity.Instructor> instructorEntityWrapper = instructorRepository.findById(courseRequest.getInstructor());

          if (instructorEntityWrapper.isEmpty()) {
               throw new NotFoundException("Instructor is not found");
          }

          int levelValue = courseRequest.getLevel();
          com.example.online_learning_platform.entity.Instructor instructor = instructorEntityWrapper.get();
          List<Lesson> lessons = new ArrayList<>();
          com.example.online_learning_platform.entity.Course course = new com.example.online_learning_platform.entity.Course();
          course.setInstructor(instructor);

          Optional<Category> categoryOptional=categoryRepository.findById(courseRequest.getCategoryId());
          if(categoryOptional.isPresent()){
               Category category = categoryOptional.get();
               course.setCategory(category);
          }

          for (com.example.online_learning_platform.model.Lesson lessonRequest : courseRequest.getLessons()) {
               Optional<Video> videoOptional = videoRepository.findById(lessonRequest.getVideoId());
               if(videoOptional.isEmpty()){
                    throw new NotFoundException("Video is not found with ID: " +lessonRequest.getVideoId());
               }

               Video video=videoOptional.get();
               Lesson lesson = new Lesson();
               lesson.setCourse(course);
               lesson.setTitle(lessonRequest.getTitle());
               lesson.setDescription(lessonRequest.getDescription());
               lesson.setVideoId(video);
               lesson.setIsActive(true);
               lessons.add(lesson);
          }
          course.setIsActive(true);
          course.setDescription(courseRequest.getDescription());
          course.setTitle(courseRequest.getTitle());
          course.setFees(courseRequest.getFees());
          Level level = Level.values()[courseRequest.getLevel() - 1];
          course.setLevel(level);
          course.setLessons(lessons);
          course = courseRepository.save(course);
          lessonRepository.saveAll(lessons);

          Course courseModel = new Course();
          courseModel.setId(course.getId());
          courseModel.setTitle(course.getTitle());
          courseModel.setDescription(course.getDescription());
          courseModel.setInstructor(course.getInstructor().getId());
          courseModel.setLevel(course.getLevel().toString());
          courseModel.setCategoryId(course.getCategory().getId());
          courseModel.setFees(course.getFees());
          List<Lesson> lessonsEntity = course.getLessons();
          List<com.example.online_learning_platform.model.Lesson> lessonsModelList = new ArrayList<>();
          for(Lesson lesson: lessonsEntity){
               if(lesson.getIsActive()){
                    com.example.online_learning_platform.model.Lesson lessonList = new com.example.online_learning_platform.model.Lesson();
                    lessonList.setId(lesson.getId());
                    lessonList.setTitle(lesson.getTitle());
                    lessonList.setDescription(lesson.getDescription());
                    lessonList.setVideoId(lesson.getVideoId().getId());
                    String videoId = videoServiceImplementation.extractVideoId(lesson.getVideoId().getLink());
                    lessonList.setYoutubeVideoId(videoId);
                    lessonsModelList.add(lessonList);
               }
          }
          courseModel.setLessons(lessonsModelList);
          return courseModel;
     }
     @Override
     public Course displayCourse(Long id) throws NotFoundException{
          com.example.online_learning_platform.entity.Course course = courseRepository.findById(id).orElseThrow(()-> new NotFoundException("Course is not found"));
          if(!course.getIsActive()){
               throw new NotFoundException("Course is not found!");
          }
          Course courseModel = new Course();
          courseModel.setId(id);
          courseModel.setTitle(course.getTitle());
          courseModel.setDescription(course.getDescription());
          courseModel.setInstructor(course.getInstructor().getId());
          courseModel.setLevel(course.getLevel().toString());
          courseModel.setCategoryId(course.getCategory().getId());
          courseModel.setFees(course.getFees());
          List<Lesson> lessons = course.getLessons();
          List<com.example.online_learning_platform.model.Lesson> lessonsModelList = new ArrayList<>();
          for(Lesson lesson: lessons){
               if(lesson.getIsActive()){
                    com.example.online_learning_platform.model.Lesson lessonList = new com.example.online_learning_platform.model.Lesson();
                    lessonList.setId(lesson.getId());
                    lessonList.setTitle(lesson.getTitle());
                    lessonList.setDescription(lesson.getDescription());
                    lessonList.setVideoId(lesson.getVideoId().getId());
                    String videoId = videoServiceImplementation.extractVideoId(lesson.getVideoId().getLink());
                    if (videoId!=null){
                         lessonList.setYoutubeVideoId(videoId);
                    } else{
                         lessonList.setYoutubeVideoId(lesson.getVideoId().getLink());
                    }

                    lessonsModelList.add(lessonList);
               }
          }
          courseModel.setLessons(lessonsModelList);
          return courseModel;
     }
     @Override
     public Course addLesson(com.example.online_learning_platform.model.CourseRequest courseRequest) throws NotFoundException{
          Optional<com.example.online_learning_platform.entity.Course> optionalCourse = courseRepository.findById(courseRequest.getId());
          if(optionalCourse.isEmpty()){
               throw new NotFoundException("Course is not found.");
          }
          List<Lesson> existingLessons = new ArrayList<>();
          if(courseRequest.getId()!=null){
               Optional<com.example.online_learning_platform.entity.Course> existingCourseOptional = courseRepository.findById(courseRequest.getId());
               if(existingCourseOptional.isPresent()){
                    com.example.online_learning_platform.entity.Course existingCourse = existingCourseOptional.get();
                    existingLessons = existingCourse.getLessons();
                    existingLessons = existingLessons.stream().filter(Lesson::getIsActive).collect(Collectors.toList());

               }
          }
          com.example.online_learning_platform.entity.Course existingCourse = optionalCourse.get();
//          Optional<Instructor> instructorEntityWrapper = instructorRepository.findById(courseRequest)
      for(com.example.online_learning_platform.model.Lesson lessonRequest : courseRequest.getLessons()) {
           for (Lesson existingLesson : existingLessons) {
                if (!Objects.equals(lessonRequest.getTitle(), existingLesson.getTitle())) {
                     Optional<Video> videoOptional = videoRepository.findById(lessonRequest.getVideoId());
                     if(videoOptional.isEmpty()){
                          throw new NotFoundException("Video is not found with ID: " +lessonRequest.getVideoId());
                     }
                     Video video=videoOptional.get();
                     Lesson lesson = new Lesson();
                     lesson.setCourse(existingCourse);
                     lesson.setTitle(lessonRequest.getTitle());
                     lesson.setDescription(lessonRequest.getDescription());
                     lesson.setVideoId(video);
                     lesson.setIsActive(true);
                     existingLessons.add(lesson);
                }
           }
      }
      existingCourse.setLessons(existingLessons);
      Level level = Level.values()[courseRequest.getLevel() - 1];
      existingCourse.setLevel(level);
      existingCourse=courseRepository.save(existingCourse);
      lessonRepository.saveAll(existingLessons);
      Course courseModel = new Course();
      courseModel.setId(existingCourse.getId());
      courseModel.setTitle(existingCourse.getTitle());
      courseModel.setDescription(existingCourse.getDescription());
      courseModel.setLevel(existingCourse.getLevel().toString());
      courseModel.setFees(existingCourse.getFees());
      List<com.example.online_learning_platform.model.Lesson> lessonModelList = new ArrayList<>();
      for(Lesson savedLesson : existingLessons){
           for(com.example.online_learning_platform.model.Lesson lessonModel : courseRequest.getLessons()){
                lessonModel.setId(savedLesson.getId());
                lessonModel.setTitle(savedLesson.getTitle());
                lessonModel.setDescription(savedLesson.getDescription());
                lessonModel.setVideoId(savedLesson.getVideoId().getId());
                String videoId = videoServiceImplementation.extractVideoId(savedLesson.getVideoId().getLink());
                lessonModel.setYoutubeVideoId(videoId);
                lessonModelList.add(lessonModel);
           }
      }
      courseModel.setLessons(lessonModelList);


      return courseModel;
     }

     @Override
     public List<Course> getAllCourses(){
        List<Course>  courseModelList = new ArrayList<>();
        List<com.example.online_learning_platform.entity.Course> courses = courseRepository.findAll();
        for(com.example.online_learning_platform.entity.Course course:courses){
             if(course.getIsActive()){
                  Course courseModel = new Course();
                  courseModel.setId(course.getId());
                  courseModel.setTitle(course.getTitle());
                  courseModel.setDescription(course.getDescription());
                  courseModel.setLevel(course.getLevel().toString());
                  courseModel.setFees(course.getFees());
                  courseModel.setInstructor(course.getInstructor().getId());
                  List<Lesson> lessonEntityList=course.getLessons();
                  List<com.example.online_learning_platform.model.Lesson> lessonModelList = new ArrayList<>();
                  for(Lesson savedLesson : lessonEntityList){
                       com.example.online_learning_platform.model.Lesson lessonModel=new com.example.online_learning_platform.model.Lesson();
                            lessonModel.setId(savedLesson.getId());
                            lessonModel.setTitle(savedLesson.getTitle());
                            lessonModel.setDescription(savedLesson.getDescription());
                            lessonModel.setVideoId(savedLesson.getVideoId().getId());
                            String videoId = videoServiceImplementation.extractVideoId(savedLesson.getVideoId().getLink());
                            lessonModel.setYoutubeVideoId(videoId);
                            lessonModelList.add(lessonModel);

                  }
                  courseModel.setLessons(lessonModelList);


             courseModelList.add(courseModel);
             }
        }
          return courseModelList;
     }

     @Override
     public boolean checkTitleAvailability(String title){
          List<com.example.online_learning_platform.entity.Course> courseList = courseRepository.findAll();
          for (com.example.online_learning_platform.entity.Course course : courseList) {
               if (course.getTitle().equalsIgnoreCase(title)) {
                    // If the title already exists, return false
                    return false;
               }
          }
          return true;
     }
     @Override
     public List<Course> getAllCourseswithZeroFees(){
          List<Course>  courseModelList = new ArrayList<>();
          List<com.example.online_learning_platform.entity.Course> courses = courseRepository.findAll();
          for(com.example.online_learning_platform.entity.Course course:courses){
               if(course.getIsActive()){
                    if(course.getFees()==0){
                         Course courseModel = new Course();
                         courseModel.setId(course.getId());
                         courseModel.setTitle(course.getTitle());
                         courseModel.setDescription(course.getDescription());
                         courseModel.setLevel(course.getLevel().toString());
                         courseModel.setFees(course.getFees());
                         courseModel.setInstructor(course.getInstructor().getId());
                         List<Lesson> lessonEntityList=course.getLessons();
                         List<com.example.online_learning_platform.model.Lesson> lessonModelList = new ArrayList<>();
                         for(Lesson savedLesson : lessonEntityList){
                              com.example.online_learning_platform.model.Lesson lessonModel=new com.example.online_learning_platform.model.Lesson();
                              lessonModel.setId(savedLesson.getId());
                              lessonModel.setTitle(savedLesson.getTitle());
                              lessonModel.setDescription(savedLesson.getDescription());
                              lessonModel.setVideoId(savedLesson.getVideoId().getId());
                              String videoId = videoServiceImplementation.extractVideoId(savedLesson.getVideoId().getLink());
                              lessonModel.setYoutubeVideoId(videoId);
                              lessonModelList.add(lessonModel);

                         }
                         courseModel.setLessons(lessonModelList);


                         courseModelList.add(courseModel);
                    }
               }
          }
          return courseModelList;
     }
     @Override
     public List<Course> getAllCourseByCategory(Long categoryId){
          Category categoryEntity = categoryRepository.findById(categoryId).orElseThrow(()->new NotFoundException("Categpry is not found!"));
          if(categoryEntity.getIsActive()){
               List<com.example.online_learning_platform.entity.Course> courses = courseRepository.findByCategory(categoryEntity);
               List<Course> courseModels = new ArrayList<>();
               for(com.example.online_learning_platform.entity.Course course : courses ){
                    if(course.getIsActive()){
                         if(course.getFees()!=0){
                              Course courseModel = new Course();
                              BeanUtils.copyProperties(course,courseModel);
                              courseModels.add(courseModel);
                         }
                    }
               }
          return courseModels;
          } else {
               throw new NotFoundException("Category is not active with ID: " + categoryId);
          }

     }
     @Override
     public List<Course> getCourseByInstructor(Long instructorId) {
          Instructor instructor = instructorRepository.findById(instructorId).orElseThrow(()->new NotFoundException("Instructor is not found with ID: "+instructorId));
          if(instructor.getIsActive()){
               List<Course>  courseModelList = new ArrayList<>();
               List<com.example.online_learning_platform.entity.Course> courseList = courseRepository.findByInstructor(instructor);
               List<Course> courseModels = new ArrayList<>();
               for(com.example.online_learning_platform.entity.Course course : courseList ){
                    if(course.getIsActive()){
                         Course courseModel = new Course();
                         courseModel.setId(course.getId());
                         courseModel.setTitle(course.getTitle());
                         courseModel.setDescription(course.getDescription());
                         courseModel.setLevel(course.getLevel().toString());
                         courseModel.setFees(course.getFees());
                         courseModel.setInstructor(course.getInstructor().getId());
//                         List<Lesson> lessonEntityList=course.getLessons();
//                         List<com.example.online_learning_platform.model.Lesson> lessonModelList = new ArrayList<>();
//                         for(Lesson savedLesson : lessonEntityList){
//                              com.example.online_learning_platform.model.Lesson lessonModel=new com.example.online_learning_platform.model.Lesson();
//                              lessonModel.setId(savedLesson.getId());
//                              lessonModel.setTitle(savedLesson.getTitle());
//                              lessonModel.setDescription(savedLesson.getDescription());
//                              lessonModel.setVideoId(savedLesson.getVideoId().getId());
//                              String videoId = videoServiceImplementation.extractVideoId(savedLesson.getVideoId().getLink());
//                              lessonModel.setYoutubeVideoId(videoId);
//                              lessonModelList.add(lessonModel);
//
//                         }
//                         courseModel.setLessons(lessonModelList);
//

                         courseModelList.add(courseModel);
//                         BeanUtils.copyProperties(course,courseModel);
//                         courseModels.add(courseModel);
                    }
               }
               return courseModelList;
          } else {
               throw new NotFoundException("Instructor is not active with ID: " + instructorId);
          }
     }
}





