package com.aimock.backend.controller;

import com.aimock.backend.entity.CodingHistory;
import com.aimock.backend.repository.CodingHistoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coding-history")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CodingHistoryController {

    private final CodingHistoryRepository repository;

    @GetMapping("/{email}")
    public List<CodingHistory> getCodingHistory(
            @PathVariable String email
    ) {

        return repository
                .findByUserEmailOrderByCreatedAtDesc(email);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCodingHistory(
            @PathVariable Long id
    ) {

        repository.deleteById(id);

        return ResponseEntity.ok(
                "Deleted Successfully"
        );
    }
}