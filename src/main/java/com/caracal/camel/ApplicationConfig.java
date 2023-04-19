package com.caracal.camel;

import org.apache.camel.CamelContext;
import org.apache.camel.Configuration;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.spring.boot.CamelContextConfiguration;
import org.springframework.context.annotation.Bean;

@Configuration
public class ApplicationConfig {
    @Bean
    CamelContextConfiguration contextConfiguration() {
        return new CamelContextConfiguration() {
            @Override
            public void beforeApplicationStart(CamelContext camelContext) {
                createApplicationSettings(camelContext);
            }

            private void createApplicationSettings(CamelContext camelContext) {
                var properties = new PropertiesComponent();
                properties.addLocation("classpath:mqtt-properties.properties");
                properties.addLocation("classpath:http-employee.properties");

                camelContext.setPropertiesComponent(properties);
            }

            @Override
            public void afterApplicationStart(CamelContext camelContext) {
                setShutdownStrategy(camelContext);
            }

            private void setShutdownStrategy(CamelContext camelContext) {
                var shutdownStrategy = camelContext.getShutdownStrategy();
                shutdownStrategy.setTimeout(1);
                shutdownStrategy.setShutdownNowOnTimeout(true);
                shutdownStrategy.setSuppressLoggingOnTimeout(true);
                shutdownStrategy.setLogInflightExchangesOnTimeout(false);
                shutdownStrategy.setSuppressLoggingOnTimeout(true);
            }
        };
    }
}