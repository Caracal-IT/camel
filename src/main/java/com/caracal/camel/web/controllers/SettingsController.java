package com.caracal.camel.web.controllers;

import com.caracal.camel.utils.MqttSettings;
import com.caracal.camel.web.models.SettingsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    private final MqttSettings settings = new MqttSettings();

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public SettingsResponse getSettings(){
        var response = new SettingsResponse();
        response.setCloudBrokerUrl(settings.getValue(MqttSettings.cloud + ".brokerUrl"));
        response.setServerBrokerUrl(settings.getValue(MqttSettings.server + ".brokerUrl"));

        return response;
    }
}
