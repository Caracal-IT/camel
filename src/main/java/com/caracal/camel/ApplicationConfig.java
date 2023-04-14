package com.caracal.camel;

import org.apache.camel.CamelContext;
import org.apache.camel.Configuration;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.spring.boot.CamelContextConfiguration;
import org.springframework.context.annotation.Bean;

import org.apache.camel.processor.errorhandler.RedeliveryPolicy;

@Configuration
public class ApplicationConfig {
    @Bean
    CamelContextConfiguration contextConfiguration() {
        return new CamelContextConfiguration() {
            @Override
            public void beforeApplicationStart(CamelContext camelContext) {
                var properties = new PropertiesComponent();
                properties.addLocation("classpath:mqtt-properties.properties");
                properties.addLocation("classpath:http-employee.properties");

                camelContext.setPropertiesComponent(properties);
            }

            @Override
            public void afterApplicationStart(CamelContext camelContext) {

            }
        };
    }
}

/*
<redeliveryPolicyProfile id="testRedeliveryPolicyProfile"
			retryAttemptedLogLevel="WARN" maximumRedeliveries="5"
			redeliveryDelay="5" />
 */