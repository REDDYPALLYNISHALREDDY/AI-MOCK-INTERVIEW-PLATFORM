package com.aimock.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRequest {

    private String question;

    private String answer;

    private String domain;

    private String difficulty;

    private String userEmail;

    private String personality;
}