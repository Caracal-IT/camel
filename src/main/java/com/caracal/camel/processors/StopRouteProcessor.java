package com.caracal.camel.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;

public class StopRouteProcessor implements Processor {
    @Value("${camel.springboot.route-shutdown-delay}")
    private long routeDelay;

    @Override
    public void process(Exchange exchange) throws Exception {
        var routeId = exchange.getFromRouteId();
        var controller = exchange.getContext().getRouteController();
        exchange.setRouteStop(true);
        controller.stopRoute(routeId, 1, TimeUnit.MILLISECONDS, false);
        Thread.sleep(routeDelay);
        controller.startRoute(routeId);
    }
}
