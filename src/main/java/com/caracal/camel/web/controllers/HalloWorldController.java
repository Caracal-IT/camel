package com.caracal.camel.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class HalloWorldController {
    @GetMapping("/greet")
    @ResponseStatus(HttpStatus.OK)
    public String greet(){
        return "Hallo World";
    }
}
