package com.aimock.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {

    private String feedback;

    private String score;

    private String nextQuestion;

    private String domain;

    private String nextDifficulty;

    private String weakness;
}