package com.aimock.backend.service;

import com.aimock.backend.dto.InterviewResponse;
import com.aimock.backend.entity.InterviewSession;
import com.aimock.backend.repository.InterviewSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.aimock.backend.entity.InterviewHistory;
import com.aimock.backend.repository.InterviewHistoryRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final GeminiService geminiService;

    private final InterviewSessionRepository repository;

    private final InterviewHistoryRepository historyRepository;

    public InterviewResponse evaluate(
            String question,
            String answer,
            String domain,
            String difficulty,
            String userEmail,
            String personality
    ) {

        String aiResponse =
                geminiService.evaluateAnswer(
                        question,
                        answer,
                        domain,
                        difficulty,
                        personality
                );

        System.out.println(aiResponse);

        String feedback = extractValue(
                aiResponse,
                "feedback:",
                "score:"
        );

        String score = extractValue(
                aiResponse,
                "score:",
                "weakness:"
        );

        String weakness = extractValue(
                aiResponse,
                "weakness:",
                "next_difficulty:"
        );

        String nextDifficulty = extractValue(
                aiResponse,
                "next_difficulty:",
                "next_question:"
        );

        String nextQuestion = extractValue(
                aiResponse,
                "next_question:",
                null
        );

        if (feedback.isEmpty()) {
            feedback = "Unable to parse AI response";
        }

        if (score.isEmpty()) {
            score = "0/10";
        }

        if (weakness.isEmpty()) {
            weakness = "No weakness analysis available";
        }

        if (nextDifficulty.isEmpty()) {
            nextDifficulty = difficulty;
        }

        if (domain.equalsIgnoreCase("Resume Interview")) {

            nextQuestion = "";

            nextDifficulty = difficulty;
        }


        InterviewSession session =
                InterviewSession.builder()
                        .question(question)
                        .answer(answer)
                        .feedback(feedback)
                        .score(score)
                        .weakness(weakness)
                        .domain(domain)
                        .userEmail(userEmail)
                        .createdAt(LocalDateTime.now())
                        .build();
        System.out.println(userEmail);
        System.out.println(question);
        System.out.println(score);
        repository.save(session);

        System.out.println("SESSION SAVED SUCCESSFULLY");

        InterviewHistory history =
                InterviewHistory.builder()
                        .question(question)
                        .answer(answer)
                        .feedback(feedback)
                        .score(score)
                        .domain(domain)
                        .difficulty(difficulty)
                        .userEmail(userEmail)
                        .createdAt(LocalDateTime.now())
                        .build();

        historyRepository.save(history);

        System.out.println("INTERVIEW HISTORY SAVED");

        return InterviewResponse.builder()
                .feedback(feedback)
                .score(score)
                .nextQuestion(nextQuestion)
                .nextDifficulty(nextDifficulty)
                .weakness(weakness)
                .build();
    }

    private String extractValue(
            String text,
            String start,
            String end
    ) {

        try {

            String upperText = text.toUpperCase();

            int startIndex = upperText.indexOf(start.toUpperCase());

            if (startIndex == -1) {
                return "";
            }

            startIndex += start.length();

            int endIndex;

            if (end != null) {

                endIndex =
                        upperText.indexOf(end.toUpperCase(), startIndex);

                if (endIndex == -1) {
                    endIndex = text.length();
                }

            } else {

                endIndex = text.length();
            }

            return text
                    .substring(startIndex, endIndex)
                    .trim();

        } catch (Exception e) {

            return "";
        }
    }
}