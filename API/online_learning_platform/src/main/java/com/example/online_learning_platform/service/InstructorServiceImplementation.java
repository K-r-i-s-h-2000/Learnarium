package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Instructor;
import com.example.online_learning_platform.model.Student;
import com.example.online_learning_platform.repository.InstructorRepository;
import com.example.online_learning_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorServiceImplementation implements InstructorService{
    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private UserRepository userRepository;

//    @Override
//    public Student updateInsrtuctor(Long id, Instructor updatedInstructor) throws NotFoundException {
//        com.example.online_learning_platform.entity.Instructor instructorEntity = instructorRepository.findById(id).orElseThrow(()-> new NotFoundException("User is not found with ID:" + id));
//        if(!instructorEntity.getIsActive()){
//            try{
//                throw new NotFoundException("User is not found with ID:" + id);
//            } catch (NotFoundException e){
//                throw new RuntimeException(e);
//            }
//        }
//        if(updatedInstructor.getInstructorName()!=null){
//            instructorEntity.setName(updatedStudent.getStudentName());
//        }
//        if (updatedStudent.getStudentEmail()!=null){
//            studentEntity.setEmail(updatedStudent.getStudentEmail());
//        }
//        studentEntity=studentRepository.save(studentEntity);
//        Student studentModel = new Student();
//        studentModel.setId(studentModel.getId());
//        studentModel.setStudentAddress(studentEntity.getAddress());
//        studentModel.setStudentDateOfBirth(studentEntity.getDateOfBirth());
//        studentModel.setStudentGender(studentEntity.getGender());
//        studentModel.setStudentName(studentEntity.getName());
//        studentModel.setStudentEmail(studentEntity.getEmail());
//        return studentModel;
//    }


}


