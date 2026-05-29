package com.aimock.backend.dto;

import lombok.Data;

@Data
public class PistonResponse {

    private Run run;

    @Data
    public static class Run {

        private String output;
    }
}