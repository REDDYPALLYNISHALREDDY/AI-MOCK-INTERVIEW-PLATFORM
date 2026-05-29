package com.aimock.backend.controller;

import com.aimock.backend.service.CodingService;
import com.aimock.backend.dto.CodingQuestionResponse;
import com.aimock.backend.dto.CodeRequest;
import com.aimock.backend.dto.CodeResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coding")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CodingController {

    private final CodingService codingService;

    @PostMapping("/evaluate")
    public CodeResponse evaluateCode(
            @RequestBody CodeRequest request
    ) {

        return codingService.evaluateCode(
                request.getLanguage(),
                request.getQuestion(),
                request.getCode(),
                request.getUserEmail()
        );
    }

    @GetMapping("/question")
    public CodingQuestionResponse generateQuestion(
            @RequestParam String language,
            @RequestParam String difficulty
    ) {

        String question =
                codingService.generateCodingQuestion(
                        language,
                        difficulty
                );

        return new CodingQuestionResponse(question);
    }
}