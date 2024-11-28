package org.link_shortener.controllers;

import org.link_shortener.dtos.TokenDto;
import org.link_shortener.dtos.UserRequestDto;
import org.link_shortener.exceptions.UserAlreadyExistsException;
import org.link_shortener.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<TokenDto> signUp(@RequestBody UserRequestDto signUpRequest) {
        try {
            return ResponseEntity.ok(userService.registration(signUpRequest));
        } catch (UserAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<TokenDto> signIn(@RequestBody UserRequestDto signInRequest) {
        try {
            return ResponseEntity.ok(userService.login(signInRequest));
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }
}
