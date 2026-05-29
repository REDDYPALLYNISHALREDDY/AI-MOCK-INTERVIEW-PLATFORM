package com.aimock.backend.controller;

import com.aimock.backend.dto.InterviewRequest;
import com.aimock.backend.dto.InterviewResponse;
import com.aimock.backend.service.InterviewService;
import com.aimock.backend.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InterviewController {

    private final InterviewService interviewService;

    private final GeminiService geminiService;

    @PostMapping("/evaluate")
    public InterviewResponse evaluateAnswer(
            @RequestBody InterviewRequest request
    ) {

        return interviewService.evaluate(
                request.getQuestion(),
                request.getAnswer(),
                request.getDomain(),
                request.getDifficulty(),
                request.getUserEmail(),
                request.getPersonality()
        );
    }

    @GetMapping("/start")
    public String startInterview(
            @RequestParam String domain,
            @RequestParam String difficulty
    ) {
        return geminiService.generateFirstQuestion(domain, difficulty);
    }
}