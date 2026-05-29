package com.aimock.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String evaluateAnswer(
            String question,
            String answer,
            String domain,
            String difficulty,
            String personality
    ) {

        try {

            String prompt = """
                    You are a professional  technical interviewer

                    Evaluate the answer in 10sec

                    Interview Rules:
                    - Ask practical technical questions
                    - Ask like real interviewers
                    - Ask only from %s domain
                    - Do NOT mix unrelated domains
                    - Ask follow-up questions based on previous answer
                    - Start with beginner/intermediate placement-level questions
                    - Gradually increase difficulty slowly
                    - Ask short and realistic interview questions
                    - Avoid huge paragraphs questions unless candidate performs very well
                    
                    Adaptive Difficulty Rules:
                    - If answer quality is very good, increase difficulty
                    - If answer quality is average, keep same difficulty
                    - If answer quality is poor, reduce difficulty
                    - Next question must watch updated difficulty level
                    - Beginner questions should be basic fundamentals
                    - Intermediate questions should test concepts deeper
                    - Advanced questions should test real-world understanding
                    
                    
                    Current Difficulty:
                    %s
                    
                    Current Domain:
                    %s
                    
                    SPECIAL RULE:
                    If domain is "Resume Interview":
                    - Give detailed professional feedback
                    - Analyze communication skills
                    - Analyze confidence
                    - Detect technical weaknesses properly
                    - Give point-by-point feedback
                    - Mention missing concepts clearly
                    - Give realistic interviewer feedback
                    
                    Else:
                    - Keep feedback short and concise
                    
                    Interview Question:
                    %s

                    Candidate Answer:
                    %s

                    Rules:
                    - Keep feedback short
                    - Use simple point-to-point format
                    - No markdown symbols
                    - No bold text
                    - No stars
                    - No long paragraphs
                    - Mention strengths
                    - Mention missing concepts briefly
                    - Give score out of 10
                    
                    - Analyze communication skills
                    - Analyze confidence level
                    - Detect actual technical weaknesses
                    - Give practical improvement suggestions
                    - Mention missing concepts clearly
                    - Evaluate answer relevance properly
                    - For resume interviews, analyze based on resume context
                    - Feedback should feel like real interviewer feedback

                    Then generate ONE next interview question only based on:
                    - current domain
                    - candidate performance
                    - adaptive difficulty level
                    
                    IMPORTANT:
                    Return response ONLY in this exact format
                    
                    feedback:
                    <feedback here>
                    
                    score:
                    <score here>
                    
                    weakness:
                    <weakness here>
                    
                    next_difficulty:
                    <difficulty here>
                    
                    next_question:
                    <question here>
                    
                    RULES:
                    1. Do not change labels.
                    2. Do not add extra explanations.
                    3. Do not skip any section.
                    
                    VERY IMPORTANT:
                    If you do not follow the exact format, the system will fail.
                    
                    Interviewer Personality Mode:
                    %s
                    
                    Personality Rules:
                    
                    If personality is "Friendly HR":
                    - Be supportive
                    - Encourage candidate
                    - Ask easy-to-medium questions
                    - Give motivating feedback
                    
                    If personality is "FAANG Bar Raiser":
                    - Be highly analytical
                    - Challenge assumptions
                    - Ask scalability questions
                    - Be strict in evaluation
                    - Ask deep follow-up questions
                    
                    If personality is "Startup Founder":
                    - Focus on practical implementation
                    - Ask MVP-focused questions
                    - Ask fast-delivery questions
                    - Evaluate ownership mindset
                    
                    If personality is "Rapid Fire":
                    - Ask very short quick questions
                    - Increase pressure
                    - Reduce explanations
                    
                    If personality is "Silent Interviewer":
                    - Respond minimally
                    - Use short responses
                    - Keep interview cold and realistic
                    
                    If personality is "Supportive Mentor":
                    - Give hints
                    - Teach small concepts
                    - Help candidate improve
                    
                    If personality is "Aggressive Senior Developer":
                    - Challenge weak answers
                    - Ask debugging-focused questions
                    - Focus on real-world mistakes
                    
                    """.formatted(domain, difficulty, domain, question, answer, personality);
            return generateResponse(prompt);

        } catch (Exception e) {

            e.printStackTrace();

            return "Something went wrong";
        }
    }

    public String generateFirstQuestion(String domain, String difficulty) {

        try {

            String prompt = """
                    You are a professional AI mock interviewer
                    Your task is to ask only one interview question at a time.
                    
                    STRICT RULES:
                    - Ask ONLY ONE interview question
                    - Never ask multiple questions
                    - Never use numbering
                    - Never combine multiple questions in one paragraph
                    - Do not ask follow-up questions together
                    - Keep the question short and professional
                    - Ask like real-placement interviews
                    - Domain must be only from %s
                    - keep question short and clear
                    - Ask like real placement interviews
                    - Do not provide explanations
                    - Do not provide answers
                    - Return only the interview question text
                    - No bullet points
                    - No extra text
                    - No introductions
                    - No summaries
                    - Difficulty: %s
                    
                    SPECIAL RULE FOR RESUME INTERVIEW:
                    - Ask only one-resume based question
                    - Focus on one project or one skill at a time
                    - Do not ask about multiple projects together
                    - Keep the interview conversational and realistic
                    
                    VERY IMPORTANT:
                    Output must contain only one question.
                    
                    
                    
                    """.formatted(domain, difficulty);
            return generateResponse(prompt);

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(e);
        }
    }

    public String generateResponse(String prompt) {

        try {

            Client client = Client.builder().apiKey(apiKey).build();

            GenerateContentResponse response = client.models.generateContent("gemini-2.5-flash", prompt, null);

            return response.text();

        } catch (Exception e) {

            e.printStackTrace();

            return "Unable to generate response";
        }
    }
}