package com.aimock.backend.dto;

import lombok.Data;

@Data
public class CodeRequest {

    private String language;

    private String question;

    private String code;

    private String userEmail;
}