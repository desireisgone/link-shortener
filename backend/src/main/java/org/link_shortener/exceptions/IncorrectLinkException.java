package org.link_shortener.exceptions;

public class IncorrectLinkException extends RuntimeException {
    public IncorrectLinkException() {
        super();
    }
    public IncorrectLinkException(String message, Throwable cause) {
        super(message, cause);
    }
    public IncorrectLinkException(String message) {
        super(message);
    }
    public IncorrectLinkException(Throwable cause) {
        super(cause);
    }
}