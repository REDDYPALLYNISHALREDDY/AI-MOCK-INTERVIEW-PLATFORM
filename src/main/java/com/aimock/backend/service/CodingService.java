package com.aimock.backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import com.aimock.backend.dto.CodeResponse;
import org.springframework.web.reactive.function.client.WebClient;
import com.aimock.backend.dto.JDoodleResponse;
import com.aimock.backend.dto.JDoodleRequest;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

import com.aimock.backend.entity.CodingHistory;

import com.aimock.backend.repository.CodingHistoryRepository;
@Service
@RequiredArgsConstructor
public class CodingService {

    private final GeminiService geminiService;

    private final CodingHistoryRepository historyRepository;

    private final WebClient webClient =
            WebClient.builder()
                    .baseUrl("https://emkc.org")
                    .defaultHeader(
                            "Content-Type",
                            "application/json"
                    )
                    .build();

    @Value("${jdoodle.clientId}")
    private String clientId;

    @Value("${jdoodle.clientSecret}")
    private String clientSecret;

    public String generateCodingQuestion(
            String language,
            String difficulty
    ) {

        String prompt = """
                Generate one coding interview question.
                
                Programming Language:
                %s
                
                Difficulty:
                %s
                
                Rules:
                - Give only one question
                - Include example input/output
                - Include constraints
                - Make question realistic
                - Do not give solution
                """.formatted(
                language,
                difficulty
        );

        return geminiService.generateResponse(prompt);
    }

    public CodeResponse evaluateCode(
            String language,
            String question,
            String code,
            String userEmail
    ) {

        String realOutput =
                executeCode(language, code);

        String feedbackPrompt = """
You are an AI coding interviewer.

Question:
%s

Programming Language:
%s

Candidate Code:
%s

Program Output:
%s

Evaluate:
- correctness
- logic
- optimization
- interview performance

Give short professional feedback.
""".formatted(
                question,
                language,
                code,
                realOutput
        );

        String feedback =
                geminiService.generateResponse(
                        feedbackPrompt
                );

        CodingHistory history =
                CodingHistory.builder()
                        .question(question)
                        .code(code)
                        .output(realOutput)
                        .feedback(feedback)
                        .language(language)
                        .userEmail(userEmail)
                        .createdAt(LocalDateTime.now())
                        .build();

        historyRepository.save(history);

        System.out.println("CODING HISTORY SAVED");

        return new CodeResponse(
                realOutput,
                feedback
        );
    }

    public String executeCode(
            String language,
            String code
    ) {

        language = language.toLowerCase();

        String versionIndex = "4";

        if (language.equals("python")) {

            language = "python3";
        }

        JDoodleRequest request =
                new JDoodleRequest();

        request.setClientId(clientId);

        request.setClientSecret(clientSecret);

        request.setScript(code);

        request.setLanguage(language);

        request.setVersionIndex(versionIndex);

        WebClient client =
                WebClient.create(
                        "https://api.jdoodle.com"
                );

        JDoodleResponse response =
                client.post()
                        .uri("/v1/execute")
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(JDoodleResponse.class)
                        .block();

        return response.getOutput();
    }
}