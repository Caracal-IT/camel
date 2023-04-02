package com.caracal.camel.routes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Customer(String name, String surname, int age, Address address) { }
