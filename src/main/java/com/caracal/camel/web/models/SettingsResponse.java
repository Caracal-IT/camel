package com.caracal.camel.web.models;

public class SettingsResponse {
    private String cloudBrokerUrl;
    private String serverBrokerUrl;

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
}
