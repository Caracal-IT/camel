package com.caracal.camel.processors;

import com.caracal.camel.routes.models.WindowsServiceMetric;
import com.fasterxml.jackson.core.JsonProcessingException;
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

        for (Object messageValues : messages)
            addServiceMetrics(services, mapper, (Map<String, String>) messageValues);

        exchange.getIn().setBody(services.values());
    }

    private void addServiceMetrics(HashMap<String, WindowsServiceMetric> services, ObjectMapper mapper, Map<String, String> messageValues) throws JsonProcessingException {
        var cat = messageValues.get("cat");

        if(!Objects.equals(cat, "info") && !Objects.equals(cat, "state"))
            return;

        String body = convertToJson(messageValues);

        if(!body.startsWith("{") || !body.endsWith("}"))
            return;

        var flag = messageValues.get("flag");
        var metric = mapper.readValue(body, WindowsServiceMetric.class);
        var displayName = metric.getDisplayName();
        var state = metric.getState();

        if(!services.containsKey(metric.getName()))
            createServiceMetric(services, metric);
        else
            metric = services.get(metric.getName());

        if(Objects.equals(cat, "info"))
            metric.setDisplayName(displayName);

        if(Objects.equals(cat, "state") && Objects.equals(flag, "1")) {
            metric.setCount(1);
            metric.setState(state);
        }
    }

    private static String convertToJson(Map<String, String> messageValues) {
        return messageValues.get("body")
                            .replace("=", ":")
                            .replaceAll("(\\w+):", "\"$1\":")
                            .trim();
    }

    private void createServiceMetric(HashMap<String, WindowsServiceMetric> services, WindowsServiceMetric metric) {
        services.put(metric.getName(), metric);
        metric.setAppNamespace(appNamespace);
        metric.setUtcDateString(Instant.now().toString());
    }
}
