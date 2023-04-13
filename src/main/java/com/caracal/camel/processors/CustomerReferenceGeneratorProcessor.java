package com.caracal.camel.processors;

import com.caracal.camel.routes.models.Employee;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import java.util.UUID;

public class CustomerReferenceGeneratorProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        var employee = (Employee) exchange.getIn().getBody();
        employee.setNumber(UUID.randomUUID().toString().substring(0, 6));
        employee.setMessage("Employee Number Successfully Created");

        var objMapper = new ObjectMapper();
        var reqString = objMapper.writeValueAsString(employee);
        exchange.getIn().setBody(reqString.getBytes());
    }
}
