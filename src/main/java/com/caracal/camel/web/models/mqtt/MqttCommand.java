package com.caracal.camel.web.models.mqtt;

public class MqttCommand {
    private String requestTopic;
    private String requestMessage;
    private String responseTopic;
    private String responseMessage;

    private Boolean autoCallback;

    public String getRequestTopic() {
        return requestTopic;
    }

    public void setRequestTopic(String requestTopic) {
        this.requestTopic = requestTopic;
    }

    public String getRequestMessage() {
        return requestMessage;
    }

    public void setRequestMessage(String requestMessage) {
        this.requestMessage = requestMessage;
    }

    public String getResponseTopic() {
        return responseTopic;
    }

    public void setResponseTopic(String responseTopic) {
        this.responseTopic = responseTopic;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public Boolean getAutoCallback() {
        return autoCallback;
    }

    public void setAutoCallback(Boolean autoCallback) {
        this.autoCallback = autoCallback;
    }
}
