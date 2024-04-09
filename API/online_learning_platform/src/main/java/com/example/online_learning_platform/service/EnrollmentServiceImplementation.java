package com.example.online_learning_platform.service;

import com.example.online_learning_platform.entity.Course;
import com.example.online_learning_platform.entity.Student;
import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Enrollment;
import com.example.online_learning_platform.repository.CourseRepository;
import com.example.online_learning_platform.repository.EnrollmentRepository;
import com.example.online_learning_platform.repository.InstructorRepository;
import com.example.online_learning_platform.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EnrollmentServiceImplementation implements EnrollmentService{

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public Enrollment enrolledCourse(Long studentId, Long courseId) throws NotFoundException{
        Optional<Student> studentOptional=studentRepository.findById(studentId);
        if(studentOptional.isEmpty()){
            throw new NotFoundException("Student is not found with ID: "+studentId);
        }
        Student student = studentOptional.get();
        Optional<Course> courseOptional=courseRepository.findById(courseId);
        if(courseOptional.isEmpty()){
            throw new NotFoundException("Course is not found with ID: "+courseId);
        }
//        com.example.online_learning_platform.model.Course enrolledCourse = enrollmentRepository.findByStudentId(studentId);
        Course course = courseOptional.get();
//        if(courseId==enrolledCourse.getId()){
//            throw new NotFoundException("Course is already enrolled");
//        }
        // Check if the student is already enrolled in the same course
        boolean isAlreadyEnrolled = enrollmentRepository.existsByStudentIdAndCourseId(student, course);
        if (isAlreadyEnrolled) {
            throw new NotFoundException("Student is already enrolled in the course with ID: " + courseId);
        }
        com.example.online_learning_platform.entity.Enrollment enrollment = new com.example.online_learning_platform.entity.Enrollment();
        enrollment.setCourseId(course);
        enrollment.setStudentId(student);
        enrollment.setEnrollmentStatus("Enrolled");
        enrollmentRepository.save(enrollment);

        Enrollment enrollmentModel = new Enrollment();
        enrollmentModel.setStudentId(enrollment.getStudentId().getId());
        enrollmentModel.setCourseId(enrollment.getCourseId().getId());
        enrollmentModel.setEnrollmentStatus(enrollment.getEnrollmentStatus());
        return enrollmentModel;
    }
    @Override
    public List<com.example.online_learning_platform.model.Course> enrolledCoursesByStudentId(Long studentId){
        Optional<Student> studentOptional=studentRepository.findById(studentId);
        if(studentOptional.isEmpty()){
            throw new NotFoundException("Student is not found with ID: "+studentId);
        }
        Student student=studentOptional.get();
        Enrollment enrollmentModel = new Enrollment();

        List<Enrollment> enrollmentModelList = new ArrayList<>();
        List<com.example.online_learning_platform.model.Course> enrolledCourseList =new ArrayList<>();
        List<com.example.online_learning_platform.entity.Enrollment> enrollmentList = enrollmentRepository.findEnrollmentsByStudentId(student);
        for(com.example.online_learning_platform.entity.Enrollment enrollment:enrollmentList){
            if(Objects.equals(enrollment.getStudentId().getId(), studentId)){

//                enrollmentModel.setCourseId(enrollment.getCourseId().getId());
//                enrollmentModel.setStudentId(enrollment.getStudentId().getId());
//                enrollmentModel.setEnrollmentStatus(enrollment.getEnrollmentStatus());
////                enrollmentModelList.add(enrollmentModel);
                com.example.online_learning_platform.model.Course courseModel = new com.example.online_learning_platform.model.Course();
                BeanUtils.copyProperties(enrollment.getCourseId(),courseModel);

//                courseModel.setId(enrollment.getCourseId().getId());
//                courseModel.setCategoryId(enrollment.getCourseId().getCategory().getId());
//                courseModel.setDescription(enrollment.getCourseId().getDescription());
//                courseModel.setLevel(enrollment.getCourseId().getLevel().toString());
                courseModel.setFees(enrollment.getCourseId().getFees());
                enrolledCourseList.add(courseModel);

            }

        }
        return enrolledCourseList;
    }
    @Override
    public List<com.example.online_learning_platform.model.Student> listOfStudentEnrolled(Long courseId){
        Course course=courseRepository.findById(courseId).orElseThrow(()->new NotFoundException("Course is not found with ID: "+courseId));
        List<com.example.online_learning_platform.entity.Enrollment> enrollmentList=enrollmentRepository.findStudentsByCourseId(course);
        List<com.example.online_learning_platform.model.Student> studentModelList = new ArrayList<>();
        for (com.example.online_learning_platform.entity.Enrollment enrollment:enrollmentList){
            if(enrollment.getStudentId().getIsActive()){
                Student student= enrollment.getStudentId();
                com.example.online_learning_platform.model.Student studentModel=new com.example.online_learning_platform.model.Student();
                studentModel.setId(student.getId());
                studentModel.setStudentName(student.getUser().getFirstname());
                studentModel.setStudentEmail(student.getUser().getEmail());
                studentModel.setStudentAddress(student.getAddress());
                studentModel.setStudentGender(student.getGender());
                studentModel.setStudentDateOfBirth(student.getDateOfBirth());
                studentModelList.add(studentModel);
            }
        }
    return studentModelList;
    }



}
