package com.caracal.camel.endpoints;

import com.caracal.camel.endpoints.mqtt5.CaracalMqtt5Component;
import com.caracal.camel.endpoints.mqtt5.CaracalMqtt5Endpoint;
import com.caracal.camel.endpoints.mqtt5.CaracalMqtt5Producer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class ComponentConfiguration {
    @Bean("CaracalMqtt5Endpoint")
    @Scope("prototype")
    public CaracalMqtt5Endpoint createDvgMqtt5Endpoint(String uri, CaracalMqtt5Component component) {
        return new CaracalMqtt5Endpoint(uri, component);
    }

    @Bean("CaracalMqtt5Producer")
    @Scope("prototype")
    public CaracalMqtt5Producer myCustomProducer(CaracalMqtt5Endpoint endpoint) {
        return new CaracalMqtt5Producer(endpoint);
    }
}
