package com.caracal.camel.endpoints.mqtt5;

import org.apache.camel.Endpoint;
import org.apache.camel.support.DefaultComponent;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CaracalMqtt5Component extends DefaultComponent {
    private final BeanFactory beanFactory;

    public CaracalMqtt5Component(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }

    @Override
    protected Endpoint createEndpoint(String uri, String remaining, Map<String, Object> parameters) throws Exception {
        return (Endpoint) beanFactory.getBean("CaracalMqtt5Endpoint", uri, this);
    }
}
