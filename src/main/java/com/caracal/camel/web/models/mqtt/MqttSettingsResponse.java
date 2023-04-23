package com.caracal.camel.web.models.mqtt;

public class MqttSettingsResponse {
    private String cloudBrokerUrl;
    private String serverBrokerUrl;
    private String appVersion;

    public String getCloudBrokerUrl() {
        return cloudBrokerUrl;
    }

    public void setCloudBrokerUrl(String cloudBrokerUrl) {
        this.cloudBrokerUrl = cloudBrokerUrl;
    }

    public String getServerBrokerUrl() {
        return serverBrokerUrl;
    }

    public void setServerBrokerUrl(String serverBrokerUrl) {
        this.serverBrokerUrl = serverBrokerUrl;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }
}
