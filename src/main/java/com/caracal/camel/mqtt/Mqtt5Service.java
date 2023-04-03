package com.caracal.camel.mqtt;

import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;

import java.util.UUID;

public class Mqtt5Service {
    public static Mqtt5Service Instance = new Mqtt5Service();
    private Mqtt5Client client;
    private MqttSettings settings;

    private boolean isAutoResponseEnabled;

    private Mqtt5Service(){
        try {
            settings = new MqttSettings();
            client = createClient(MqttSettings.server);
            client.setAutomaticReconnect(true);
            client.connect();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public void publish(String topic, String message) throws Exception {
        publish(topic, new MqttMessage(message.getBytes()));
    }

    public void publishRequest(String topic, String responseTopic, String message) throws Exception {
        var command = String.format("{\"command\": \"%s\"}", message);

        MqttProperties props = new MqttProperties();
        props.setResponseTopic(responseTopic);

        var mqttMsg = new MqttMessage(command.getBytes());
        mqttMsg.setProperties(props);

        var requestClient = createClient(MqttSettings.cloud);
        requestClient.connect();
        requestClient.publish(topic, mqttMsg);
        requestClient.disConnectAndClose();
    }

    public void publishResponse(String topic, String message) throws Exception {
        var response = String.format("{\"command\": \"%s\", \"respId\": \"%s\"}", message, UUID.randomUUID());

        publish(topic, new MqttMessage(response.getBytes()));
    }

    public void subscribe(String topic) {
        client.subscribe(removePrefix(topic));
    }

    public void unSubscribe(String topic){
        client.unSubscribe(removePrefix(topic));
    }

    public boolean getIsAutoResponseEnabled() {
        return isAutoResponseEnabled;
    }

    public void setAutoResponseEnabled(boolean autoResponseEnabled) {
        isAutoResponseEnabled = autoResponseEnabled;
    }

    private TlsConfig getTlsConfig(String key) {
        var tlsConfig = new TlsConfig();

        tlsConfig.getKeyStore().setStore(settings.getValue(key + ".keyStore"));
        tlsConfig.getKeyStore().setPassword(settings.getValue(key + ".keyStorePwd"));
        tlsConfig.getTrustStore().setStore(settings.getValue(key + ".trustStore"));
        tlsConfig.getTrustStore().setPassword(settings.getValue(key + ".trustStorePwd"));

        return tlsConfig;
    }

    private String getBrokerUrl(String key) {
        return settings.getValue(key + ".brokerUrl");
    }

    private Mqtt5Client createClient(String key) {
        var brokerUrl = getBrokerUrl(key);
        return new Mqtt5Client(brokerUrl, getTlsConfig(key), new Mqtt5Callback(this));
    }

    private void publish(String topic, MqttMessage message) throws Exception {
        client.publish(topic, message);
    }

    private String removePrefix(String topic) {
        var suffix = settings.getValue("cloud.rootTopicPrefix").length();
        return topic.substring(suffix);
    }
}
