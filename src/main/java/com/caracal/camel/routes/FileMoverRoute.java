package com.caracal.camel.routes;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class FileMoverRoute extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("file:./data/files/java")
            .routeId("java-file-mover")
            .log("${headers}")
            .log("${body}")
            .to("file:./data/files/java/processed");
    }
}