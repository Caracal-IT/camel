package com.caracal.camel.mqtt;

import org.eclipse.paho.mqttv5.client.*;
import org.eclipse.paho.mqttv5.client.persist.MemoryPersistence;
import org.eclipse.paho.mqttv5.common.MqttMessage;

import java.util.Properties;
import java.util.UUID;

public class Mqtt5Client {
    private MqttAsyncClient client;
    private boolean automaticReconnect;
    private TlsConfig tlsConfig;
    private String userName;
    private String password;

    public Mqtt5Client(String brokerUrl, TlsConfig tlsConfig) {
        try {
            this.tlsConfig = tlsConfig;
            client = new MqttAsyncClient(brokerUrl, UUID.randomUUID().toString(), new MemoryPersistence());

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public Mqtt5Client(String brokerUrl, TlsConfig tlsConfig, MqttCallback callback) {
        this(brokerUrl, tlsConfig);

        client.setCallback(callback);
    }
    public void connect() throws Exception {
        MqttConnectionOptions connOpts = new MqttConnectionOptions();
        var properties = new Properties();
        properties.setProperty("com.ibm.ssl.protocol", "TLS");

        properties.setProperty("com.ibm.ssl.keyStore", this.tlsConfig.getKeyStore().getStore());
        properties.setProperty("com.ibm.ssl.keyStorePassword", this.tlsConfig.getKeyStore().getPassword());

        properties.setProperty("com.ibm.ssl.trustStore", this.tlsConfig.getTrustStore().getStore());
        properties.setProperty("com.ibm.ssl.trustStorePassword", this.tlsConfig.getTrustStore().getPassword());

        connOpts.setSSLProperties(properties);
        connOpts.setCleanStart(false);

        if(getUserName() != null)
            connOpts.setUserName(getUserName());

        if(getPassword() != null)
            connOpts.setPassword(getPassword().getBytes());

        IMqttToken token = client.connect(connOpts);
        token.waitForCompletion();
    }

    public void disConnectAndClose() throws Exception {
        if(client == null) {
            return;
        }

        client.disconnect();
        client.close();
    }

    public void publish(String topic, MqttMessage message) throws Exception {
        if(client == null) {
            return;
        }

        if(!client.isConnected() && isAutomaticReconnect())
            client.connect();

        IMqttToken token = client.publish(topic, message);
        token.waitForCompletion();
    }

    public void unSubscribe(String topic) {
        try {
            client.unsubscribe(topic);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public void subscribe(String topic) {
        try {
            if(!client.isConnected() && isAutomaticReconnect())
                client.connect();

            client.subscribe(topic, 1);
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public boolean isAutomaticReconnect() {
        return automaticReconnect;
    }

    public void setAutomaticReconnect(boolean automaticReconnect) {
        this.automaticReconnect = automaticReconnect;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
