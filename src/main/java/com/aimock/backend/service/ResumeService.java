package com.aimock.backend.service;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final GeminiService geminiService;

    public String analyzeResume(

            MultipartFile file,

            String domain,

            String difficulty
    ) {

        PDDocument document = null;

        try {

            InputStream inputStream =
                    file.getInputStream();

            document =
                    PDDocument.load(inputStream);

            PDFTextStripper pdfStripper =
                    new PDFTextStripper();

            String resumeText =
                    pdfStripper.getText(document);

            if (resumeText == null || resumeText.isBlank()) {

                return "Unable to extract text from resume";
            }

            // LIMIT TEXT SIZE FOR PHI3
            if (resumeText.length() > 4000) {

                resumeText =
                        resumeText.substring(0, 4000);
            }

            String prompt = """

                    Analyze this resume carefully.
                    
                    IMPORTANT RULES:
                    - Only use information present in the resume
                    - Do not assume any skills
                    - Do not add technologies not mentioned
                    - Do not hallucinate
                    - If something is missing. say "Not Mentioned"
                    
                    - Keep answers short and professional
                    - Use bullet points
                    - Avoid long paragraphs

                    Give response in this format:

                    SUMMARY:
                    short summary

                    SKILLS:
                    only skills from resume

                    STRENGTHS:
                    based only on resume

                    IMPROVEMENTS:
                    suggest improvements only

                    INTERVIEW QUESTIONS:
                    generate 5 interview questions only from resume content

                    Resume:
                    """
                    + resumeText;

            String aiResponse =
                    geminiService.generateResponse(prompt);

            if (aiResponse == null || aiResponse.isBlank()) {

                return "AI did not return any response";
            }

            return aiResponse;

        } catch (Exception e) {

            e.printStackTrace();

            return "Resume analysis failed: " + e.getMessage();

        } finally {

            try {

                if (document != null) {

                    document.close();
                }

            } catch (Exception e) {

                e.printStackTrace();
            }
        }
    }
}