package com.aimock.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PistonRequest {

    private String language;

    private String version;

    private List<FileContent> files;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FileContent {

        private String content;
    }
}