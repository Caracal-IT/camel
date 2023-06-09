package com.caracal.camel.web.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class HomeController {
    @Value("${spring.application.name}")
    String appName;

    @GetMapping("/")
    //@PreAuthorize("permitAll()")
    @Secured("USER")
    public String getHomePage(Model model) {
        model.addAttribute("appName", appName);

        return "home";
    }
}
