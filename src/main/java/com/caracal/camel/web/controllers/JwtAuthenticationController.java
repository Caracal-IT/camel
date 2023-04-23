package com.caracal.camel.web.controllers;

import com.caracal.camel.web.models.jwt.JwtResponse;
import com.caracal.camel.web.models.jwt.JwtUserResponse;
import com.caracal.camel.web.utilities.JwtTokenUtil;
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
        var a = jwtTokenUtil.getUsernameFromToken(token);
        var b = jwtTokenUtil.getExpirationDateFromToken(token);
        var c = jwtTokenUtil.validateToken(token, user);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/user")
    public ResponseEntity<?> createAuthenticationToken(@RequestHeader (name="Authorization") String token) throws Exception {
        token = token.trim();
        var username = jwtTokenUtil.getUsernameFromToken(token.substring(token.lastIndexOf(" ")));
        return ResponseEntity.ok(new JwtUserResponse(username));
    }
}