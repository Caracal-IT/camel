package com.caracal.camel.routes.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WindowsServiceMetric {
    private String appNamespace;
    private String name;
    @JsonProperty("display_name")
    private String displayName;
    private String state;
    private int count;

    private String utcDateString;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAppNamespace() {
        return appNamespace;
    }

    public void setAppNamespace(String appNamespace) {
        this.appNamespace = appNamespace;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getUtcDateString() {
        return utcDateString;
    }

    public void setUtcDateString(String utcDateString) {
        this.utcDateString = utcDateString;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
