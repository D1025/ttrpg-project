package com.ttrpg.project.exceptions;

public class BannedException extends RuntimeException {
    public BannedException() {
        super("Twoje konto zostało zablokowane");
    }
}