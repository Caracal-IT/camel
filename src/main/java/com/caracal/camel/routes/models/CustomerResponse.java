package com.caracal.camel.routes.models;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerResponse {
    private UUID id = UUID.randomUUID();
    private String name = "";
    private String surname = "";
    private String message = "";

    public CustomerResponse() {
        this.setId(UUID.randomUUID());
        this.setName("");
        this.setSurname("");
        this.setMessage("");
    }

    public CustomerResponse(UUID id, String name, String surname, String message) {
        this.setId(id);
        this.setName(name);
        this.setSurname(surname);
        this.setMessage(message);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
