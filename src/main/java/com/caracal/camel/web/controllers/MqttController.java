package com.caracal.camel.web.controllers;

import com.caracal.camel.mqtt.Mqtt5Service;
import com.caracal.camel.mqtt.MqttSettings;
import com.caracal.camel.web.models.Response;
import com.caracal.camel.web.models.mqtt.MqttPublishRequest;
import com.caracal.camel.web.models.mqtt.MqttSettingsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mqtt")
public class MqttController {
    private final MqttSettings settings = new MqttSettings();
    private final Mqtt5Service service = Mqtt5Service.Instance;

    @GetMapping("/settings")
    @ResponseStatus(HttpStatus.OK)
    public MqttSettingsResponse getSettings(){
        var response = new MqttSettingsResponse();
        response.setCloudBrokerUrl(settings.getValue(MqttSettings.cloud + ".brokerUrl"));
        response.setServerBrokerUrl(settings.getValue(MqttSettings.server + ".brokerUrl"));

        return response;
    }

    @PostMapping("/publish")
    @ResponseStatus(HttpStatus.OK)
    public Response publish(@RequestBody MqttPublishRequest request) {
        var response = new Response();
        response.setMessage("Successful");

        try {
            service.publish(request.getTopic(), request.getMessage());
        }
        catch (Exception ex) {
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @PostMapping("/command")
    @ResponseStatus(HttpStatus.OK)
    public Response exeCommand(@RequestBody MqttPublishRequest request) {
        var response = new Response();
        response.setMessage("Successful");

        return response;
    }
}
