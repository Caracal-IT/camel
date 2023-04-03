package com.caracal.camel.utils;

import java.util.Properties;

public class MqttSettings {

    public static final String server = "server";
    public static final String cloud = "cloud";

    private Properties properties;

    public MqttSettings() {
        properties = new Properties();

        try {
            properties.load(MqttSettings.class.getClassLoader().getResourceAsStream("mqtt-properties.properties"));
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public String getValue(String key) {
        return properties.getProperty(key, "");
    }
}
