package com.server.backend.controllers;

import com.server.backend.dtos.CreateUserDto;
import com.server.backend.dtos.LoginDto;
import com.server.backend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginDto loginDto, Authentication authentication) {
        return new ResponseEntity<>(authService.login(authentication), HttpStatus.OK);
    }
}
