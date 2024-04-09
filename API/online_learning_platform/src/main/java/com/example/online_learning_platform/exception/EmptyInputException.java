package com.example.online_learning_platform.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EmptyInputException extends Exception{
    public EmptyInputException(String message){
        super(message);
    }
}

