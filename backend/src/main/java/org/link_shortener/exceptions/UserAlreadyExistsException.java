package org.link_shortener.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        super();
    }
    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
    public UserAlreadyExistsException(String message) {
        super(message);
    }
    public UserAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
