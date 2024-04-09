package com.example.online_learning_platform.service;

import com.example.online_learning_platform.exception.NotFoundException;
import com.example.online_learning_platform.model.Student;
import com.example.online_learning_platform.repository.StudentRepository;
import com.example.online_learning_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImplementation implements StudentService{
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Student updateStudent(Long id, Student updatedStudent) throws NotFoundException {
        com.example.online_learning_platform.entity.Student studentEntity = studentRepository.findById(id).orElseThrow(()-> new NotFoundException("User is not found with ID:" + id));
        if(!studentEntity.getIsActive()){
            try{
                throw new NotFoundException("User is not found with ID:" + id);
            } catch (NotFoundException e){
                throw new RuntimeException(e);
            }
        }
        if(updatedStudent.getStudentAddress()!=null){
            studentEntity.setAddress(updatedStudent.getStudentAddress());
        }
        if(updatedStudent.getStudentDateOfBirth()!=null){
            studentEntity.setDateOfBirth(updatedStudent.getStudentDateOfBirth());
        }
        if(updatedStudent.getStudentGender()!=null){
            studentEntity.setGender(updatedStudent.getStudentGender());
        }
        if(updatedStudent.getStudentName()!=null){
            studentEntity.setName(updatedStudent.getStudentName());
        }
        if (updatedStudent.getStudentEmail()!=null){
            studentEntity.setEmail(updatedStudent.getStudentEmail());
        }
        studentEntity=studentRepository.save(studentEntity);
        Student studentModel = new Student();
        studentModel.setId(studentModel.getId());
        studentModel.setStudentAddress(studentEntity.getAddress());
        studentModel.setStudentDateOfBirth(studentEntity.getDateOfBirth());
        studentModel.setStudentGender(studentEntity.getGender());
        studentModel.setStudentName(studentEntity.getName());
        studentModel.setStudentEmail(studentEntity.getEmail());
        return studentModel;
    }

}
