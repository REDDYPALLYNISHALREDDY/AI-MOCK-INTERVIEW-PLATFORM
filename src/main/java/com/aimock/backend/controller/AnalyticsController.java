package com.aimock.backend.controller;

import com.aimock.backend.entity.InterviewSession;
import com.aimock.backend.repository.InterviewSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.aimock.backend.entity.InterviewHistory;

import com.aimock.backend.repository.InterviewHistoryRepository;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final InterviewHistoryRepository repository;

    @GetMapping("/{email}")
    public List<InterviewHistory> getAnalytics(
            @PathVariable String email
    ) {
        return repository.findByUserEmailOrderByCreatedAtDesc(email);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id) {
        repository.deleteById(id);

        return ResponseEntity.ok("Deleted Successfully");
    }
}