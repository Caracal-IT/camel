package com.caracal.camel.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.apache.camel.util.json.JsonObject;
import org.springframework.stereotype.Component;

@Component
public class JsonTransformRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        JacksonDataFormat jacksonDataFormat = new JacksonDataFormat();
        jacksonDataFormat.setPrettyPrint(true);
                from("file:./data/transform/java")
                .routeId("java-json-transform")
                .unmarshal().json(JsonLibrary.Jackson, JsonObject.class)
                .process(exchange -> {
                    JsonObject inputObject = exchange.getMessage().getBody(JsonObject.class);
                    JsonObject hierarchicalObject = new JsonObject();

                    hierarchicalObject.put("firstName", inputObject.getString("name"));
                    hierarchicalObject.put("lastName", inputObject.getString("surname"));

                    var inputAddressObject = inputObject.getMap("address");

                    JsonObject addressObject = new JsonObject();
                    addressObject.put("street", inputAddressObject.get("street"));
                    addressObject.put("city", inputAddressObject.get("city"));
                    addressObject.put("state", inputAddressObject.get("state"));
                    addressObject.put("postal_code", inputAddressObject.get("zip"));
                    hierarchicalObject.put("physical_address", addressObject);

                    exchange.getMessage().setBody(hierarchicalObject);
                })
                .marshal(jacksonDataFormat)
                .to("file:./data/transform/java/processed");
    }
}