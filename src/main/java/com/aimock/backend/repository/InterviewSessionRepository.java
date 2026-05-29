package com.aimock.backend.repository;

import com.aimock.backend.entity.InterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewSessionRepository
        extends JpaRepository<InterviewSession, Long> {
    List<InterviewSession> findByUserEmail(String userEmail);
}