package com.aimock.backend.controller;

import com.aimock.backend.dto.LoginRequest;
import com.aimock.backend.dto.SignupRequest;
import com.aimock.backend.entity.User;
import com.aimock.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        Optional<User> existingUser =
                userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already exists");

            return ResponseEntity.badRequest().body(response);
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        );

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Signup successful");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> user =
                userRepository.findByEmail(request.getEmail());

        if (user.isEmpty()) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");

            return ResponseEntity.badRequest().body(response);
        }

        if (!user.get().getPassword().equals(request.getPassword())) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid password");

            return ResponseEntity.badRequest().body(response);
        }

        Map<String, String> response = new HashMap<>();

        response.put("message", "Login successful");
        response.put("username", user.get().getUsername());
        response.put("email", user.get().getEmail());

        return ResponseEntity.ok(response);
    }
}