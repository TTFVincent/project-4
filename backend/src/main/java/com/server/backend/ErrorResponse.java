package com.server.backend;
import java.util.List;

public class ErrorResponse {
    public ErrorResponse(String message, List<String> details) {
        this.message = message;
        this.details = details;
    }

    //General error message about nature of error
    private String message;

    //Specific errors in API request processing
    private List<String> details;

    public String getMessage() {
        return message;
    }

    public List<String> getDetails() {
        return details;
    }
}
