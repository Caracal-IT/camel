package com.caracal.camel.routes;

import com.caracal.camel.routes.models.Customer;
import com.caracal.camel.routes.models.CustomerResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.converter.stream.InputStreamCache;
import org.apache.camel.http.common.HttpMessage;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RestProducerRouter extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        restConfiguration().component("servlet");

        rest("/customer/{id}")
        .post()
        .to("direct:update-customer");

        from("direct:update-customer")
        .setHeader("content-type", constant("application/json"))
                .process(exchange -> {
                    var input = (HttpMessage) exchange.getIn();

                    InputStreamCache stream = (InputStreamCache) input.getBody();
                    var mapper = new ObjectMapper();
                    var customer = mapper.readValue(stream.readAllBytes(), Customer.class);
                    var id = exchange.getIn().getHeader("id").toString();

                    var response = new CustomerResponse(UUID.fromString(id), customer.getName(), customer.getSurname(), "From Processor");
                    var json = mapper.writeValueAsString(response);

                    exchange.getIn().setBody(json.getBytes());
                });
    }
}


/*
@Component
public class RestProducerRouter extends RouteBuilder {
    @Override
    public void configure() {
        restConfiguration().component("servlet");

        rest("/device/{id}")
            .get()
            .to("direct:get-device");

        from("direct:get-device")
            .setHeader("content-type", constant("application/json"))
                .process(exchange -> {
                    var id = exchange.getIn().getHeader("id");
                    var deviceId = UUID.fromString(id.toString());

                    exchange.getIn().setBody(getDevice(deviceId));
                });
    }

    private String getDevice(UUID id) throws Exception {
            var device = new DeviceResponse();
            device.setName("Device " + id);
            device.setSerial("7F7UP2awmnGi" + id);
            device.setMessage("[Camel] OK");

            var objMapper = new ObjectMapper();
            return objMapper.writeValueAsString(device);
    }
}
 */