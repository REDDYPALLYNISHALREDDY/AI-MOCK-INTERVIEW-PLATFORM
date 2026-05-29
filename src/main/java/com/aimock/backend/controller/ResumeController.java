package com.aimock.backend.controller;

import com.aimock.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeResume(

            @RequestParam("resume") MultipartFile file,

            @RequestParam String domain,

            @RequestParam String difficulty
    ) {

        String response =
                resumeService.analyzeResume(
                        file,
                        domain,
                        difficulty
                );

        return ResponseEntity.ok(response);
    }
}