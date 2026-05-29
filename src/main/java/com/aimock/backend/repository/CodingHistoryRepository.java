package com.aimock.backend.repository;

import com.aimock.backend.entity.CodingHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodingHistoryRepository
        extends JpaRepository<CodingHistory, Long> {

    List<CodingHistory>
    findByUserEmailOrderByCreatedAtDesc(
            String userEmail
    );
}