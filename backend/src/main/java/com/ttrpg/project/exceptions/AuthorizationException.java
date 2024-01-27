package com.ttrpg.project.exceptions;

public class AuthorizationException extends RuntimeException {
    public AuthorizationException() {
        super("You are not authorized to perform this action");
    }
}
