package com.caracal.camel.mqtt;

import org.eclipse.paho.mqttv5.client.IMqttToken;
import org.eclipse.paho.mqttv5.client.MqttCallback;
import org.eclipse.paho.mqttv5.client.MqttDisconnectResponse;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class Mqtt5Callback implements MqttCallback {
    private final Mqtt5Service service;

    public Mqtt5Callback(Mqtt5Service service) {
        this.service = service;
    }

    @Override
    public void disconnected(MqttDisconnectResponse mqttDisconnectResponse) {
    }

    @Override
    public void mqttErrorOccurred(MqttException e) {
    }

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage) {
        try {
            respondWithDummy(s, mqttMessage);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    public void deliveryComplete(IMqttToken iMqttToken) {
    }

    @Override
    public void connectComplete(boolean b, String s) {
    }

    @Override
    public void authPacketArrived(int i, MqttProperties mqttProperties) {
    }

    private void respondWithDummy(String s, MqttMessage mqttMessage) throws Exception {
        var topic = mqttMessage.getProperties().getResponseTopic();
        var message = mqttMessage.getProperties().getUserProperties().get(0).getValue();

        if (topic != null) {
            service.publish(topic, message);
        }
    }
}