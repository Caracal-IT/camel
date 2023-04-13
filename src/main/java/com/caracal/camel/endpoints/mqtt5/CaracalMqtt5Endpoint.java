package com.caracal.camel.endpoints.mqtt5;

import org.apache.camel.Consumer;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.spi.UriEndpoint;
import org.apache.camel.support.DefaultEndpoint;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@UriEndpoint(firstVersion = "1.0", scheme = "caracal-mqtt", title = "MQTT 5 Endpoint", syntax = "caracal-mqtt:topic")
public class CaracalMqtt5Endpoint extends DefaultEndpoint {
    private String topic;
    private String brokerUrl;
    private String userName;
    private String password;
    private int qos;
    private String  keyStore;
    private String keyStorePassword;
    private String trustStore;
    private String trustStorePassword;

    @Autowired
    private BeanFactory beanFactory;

    public CaracalMqtt5Endpoint(String uri, CaracalMqtt5Component component) {
        super(uri, component);

        setTopicFromUri(uri);
    }

    private void setTopicFromUri(String uri) {
        try {
            var pattern = Pattern.compile("//(?<topic>[^?]+)/?", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(uri);
            boolean matchFound = matcher.find();

            if (matchFound) {
                String topic = matcher.group("topic").trim();
                setTopic(topic);
            }
        }
        catch (Exception exception) {
            System.out.println(exception.getMessage());
            setTopic("NOT_FOUND");
        }
    }

    @Override
    public Producer createProducer() throws Exception {
        return (CaracalMqtt5Producer) beanFactory.getBean("CaracalMqtt5Producer", this);
    }

    @Override
    public Consumer createConsumer(Processor processor) throws Exception {
        throw new UnsupportedOperationException("Not implemented yet: MyCustomEndpoint#createConsumer");
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    public String getBrokerUrl() {
        return brokerUrl;
    }

    public void setBrokerUrl(String brokerUrl) {
        this.brokerUrl = brokerUrl;
    }

    public int getQos() {
        return qos;
    }

    public void setQos(int qos) {
        this.qos = qos;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getKeyStore() {
        return keyStore;
    }

    public void setKeyStore(String keyStore) {
        this.keyStore = keyStore;
    }

    public String getKeyStorePassword() {
        return keyStorePassword;
    }

    public void setKeyStorePassword(String keyStorePassword) {
        this.keyStorePassword = keyStorePassword;
    }

    public String getTrustStore() {
        return trustStore;
    }

    public void setTrustStore(String trustStore) {
        this.trustStore = trustStore;
    }

    public String getTrustStorePassword() {
        return trustStorePassword;
    }

    public void setTrustStorePassword(String trustStorePassword) {
        this.trustStorePassword = trustStorePassword;
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
