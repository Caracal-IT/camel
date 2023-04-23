package com.caracal.camel;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

@Component
public class AppInfoContributor implements InfoContributor {

    @Value("${app.version}")
    private String version;

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("version", version);
    }
}