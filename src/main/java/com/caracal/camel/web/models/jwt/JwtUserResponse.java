package com.caracal.camel.web.models.jwt;

import java.io.Serial;
import java.io.Serializable;

public class JwtUserResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = -8091879091924046847L;
    private String username;

    public JwtUserResponse(String username) {
        setUsername(username);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
