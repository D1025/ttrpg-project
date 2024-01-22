package com.ttrpg.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MessageException.class)
    public ResponseEntity<ExceptionDTO> handleCustomException(MessageException ex) {
        ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getClass().getSimpleName(), ex.getMessage());
        return new ResponseEntity<>(exceptionDTO, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return new ResponseEntity<>("Wystąpił błąd: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}