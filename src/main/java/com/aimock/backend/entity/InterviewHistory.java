package com.aimock.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(columnDefinition = "TEXT")
    private String weakness;

    @Column(columnDefinition = "TEXT")
    private String score;

    @Column(columnDefinition = "TEXT")
    private String domain;

    @Column(columnDefinition = "TEXT")
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String userEmail;

    private LocalDateTime createdAt;
}