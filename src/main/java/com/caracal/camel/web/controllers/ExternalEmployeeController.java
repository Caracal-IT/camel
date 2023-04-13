package com.caracal.camel.web.controllers;

import com.caracal.camel.routes.models.ExternalEmployee;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/external")
public class ExternalEmployeeController {
    @PostMapping("/employee")
    @ResponseStatus(HttpStatus.OK)
    public ExternalEmployee updateEmployee(@RequestBody ExternalEmployee request) {
        request.setMessage("External Employee API");

        return request;
    }
}
