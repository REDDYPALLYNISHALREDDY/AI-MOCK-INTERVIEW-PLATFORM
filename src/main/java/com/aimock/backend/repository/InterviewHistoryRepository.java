package com.aimock.backend.repository;

import com.aimock.backend.entity.InterviewHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewHistoryRepository
        extends JpaRepository<InterviewHistory, Long> {

    List<InterviewHistory>
    findByUserEmailOrderByCreatedAtDesc(
            String userEmail
    );
}