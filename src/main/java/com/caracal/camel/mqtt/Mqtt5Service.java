package com.caracal.camel.mqtt;

import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;
import org.eclipse.paho.mqttv5.common.packet.UserProperty;

public class Mqtt5Service {
    public static Mqtt5Service Instance = new Mqtt5Service();
    private Mqtt5Client client;
    private MqttSettings settings;

    private Mqtt5Service(){
        try {
            settings = new MqttSettings();
            client = createClient(MqttSettings.server);
            client.connect();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public void publish(String topic, String message) throws Exception {
        publish(topic, new MqttMessage(message.getBytes()));
    }

    public String lastMessage;

    public void publishRequest(String topic, String responseTopic, String message, String responseMessage) throws Exception {
        MqttProperties props = new MqttProperties();
        props.setResponseTopic(responseTopic);
        props.getUserProperties().add(new UserProperty("responseMsg", responseMessage));

        var mqttMsg = new MqttMessage(message.getBytes());
        mqttMsg.setProperties(props);

        var requestClient = createClient(MqttSettings.cloud);
        requestClient.connect();
        requestClient.publish(topic, mqttMsg);
        requestClient.disConnectAndClose();
    }

    public void subscribe(String topic) {
        client.subscribe(removePrefix(topic));
    }

    public void unSubscribe(String topic){
        client.unSubscribe(removePrefix(topic));
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

    public String removePrefix(String topic) {
        var suffix = settings.getValue("cloud.rootTopicPrefix").length();
        return topic.substring(suffix);
    }
}
