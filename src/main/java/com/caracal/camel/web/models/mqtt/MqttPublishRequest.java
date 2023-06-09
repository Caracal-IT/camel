package com.caracal.camel.web.models.mqtt;

public class MqttPublishRequest {
    private String topic;
    private String message;
    private boolean retained;
    private int iterations;
    private int delay;

    private boolean randomAmountOfMessages;

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRetained() {
        return retained;
    }

    public void setRetained(boolean retained) {
        this.retained = retained;
    }

    public int getIterations() {
        return iterations;
    }

    public void setIterations(int iterations) {
        this.iterations = iterations;
    }

    public int getDelay() {
        return delay;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public boolean isRandomAmountOfMessages() {
        return randomAmountOfMessages;
    }

    public void setRandomAmountOfMessages(boolean randomAmountOfMessages) {
        this.randomAmountOfMessages = randomAmountOfMessages;
    }
}
