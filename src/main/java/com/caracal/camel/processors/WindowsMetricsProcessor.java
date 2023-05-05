package com.caracal.camel.processors;

import com.caracal.camel.routes.models.WindowsServiceMetric;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import java.time.Instant;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;

public class WindowsMetricsProcessor implements Processor {
    @Value("${app.namespace}")
    private String appNamespace;

    @Override
    public void process(Exchange exchange) throws Exception {
        var services = new HashMap<String, WindowsServiceMetric>();
        @SuppressWarnings("unchecked")
        var messages = (ArrayList<Object>) exchange.getIn().getBody();

        var mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        for (Object messageValues : messages) {
            @SuppressWarnings("unchecked")
            var message = (Map<String, String>) messageValues;
            var cat = message.get("cat");

            if(!Objects.equals(cat, "info") && !Objects.equals(cat, "state"))
                continue;

            var flag = message.get("flag");

            var body = message.get("body")
                    .replace("=", ":")
                    .replaceAll("(\\w+):", "\"$1\":")
                    .trim();

            if(!body.startsWith("{") || !body.endsWith("}"))
                continue;

            var metric = mapper.readValue(body, WindowsServiceMetric.class);
            var displayName = metric.getDisplayName();
            var state = metric.getState();

            if(!services.containsKey(metric.getName())) {
                services.put(metric.getName(), metric);
                metric.setAppNamespace(appNamespace);
                metric.setUtcDateString(Instant.now().toString());
            }
            else
                metric = services.get(metric.getName());

            if(Objects.equals(cat, "info"))
                metric.setDisplayName(displayName);

            if(Objects.equals(cat, "state") && Objects.equals(flag, "1")) {
                metric.setCount(1);
                metric.setState(state);
            }
        }

        exchange.getIn().setBody(services.values());
    }
}
