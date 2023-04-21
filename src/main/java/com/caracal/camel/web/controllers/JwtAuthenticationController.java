package com.caracal.camel.web.controllers;

import com.caracal.camel.web.models.jwt.JwtResponse;
import com.caracal.camel.web.utilities.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.caracal.camel.web.models.jwt.JwtRequest;

@RestController
@RequestMapping("/api/auth")
public class JwtAuthenticationController {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService users;
    private final PasswordEncoder myPasswordEncoder;

    public JwtAuthenticationController(JwtTokenUtil jwtTokenUtil, UserDetailsService users, PasswordEncoder myPasswordEncoder) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.users = users;
        this.myPasswordEncoder = myPasswordEncoder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest request) throws Exception {
        var user = users.loadUserByUsername(request.getUsername());
        var isValid = myPasswordEncoder.matches(request.getPassword(), user.getPassword());
        var token = jwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(new JwtResponse(token));
    }

}