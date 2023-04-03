package com.caracal.camel.mqtt;

public class TlsConfig {
    private JKSStore keyStore;
    private JKSStore trustStore;

    public TlsConfig() {
        setKeyStore(new JKSStore());
        setTrustStore(new JKSStore());
    }

    public JKSStore getKeyStore() {
        return keyStore;
    }

    public void setKeyStore(JKSStore keyStore) {
        this.keyStore = keyStore;
    }

    public JKSStore getTrustStore() {
        return trustStore;
    }

    public void setTrustStore(JKSStore trustStore) {
        this.trustStore = trustStore;
    }
}
