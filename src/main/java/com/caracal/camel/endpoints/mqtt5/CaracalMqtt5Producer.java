package com.caracal.camel.endpoints.mqtt5;

import com.caracal.camel.mqtt.Mqtt5Client;
import com.caracal.camel.mqtt.MqttSettings;
import com.caracal.camel.mqtt.TlsConfig;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.component.paho.mqtt5.PahoMqtt5Message;
import org.apache.camel.support.DefaultProducer;

public class CaracalMqtt5Producer extends DefaultProducer {
    private Mqtt5Client client;
    private MqttSettings settings = new MqttSettings();

    public CaracalMqtt5Producer(Endpoint endpoint) { super(endpoint); }

    @Override
    public void process(Exchange exchange) throws Exception {
        var message = (PahoMqtt5Message) exchange.getIn();
        var mqttMessage = message.getMqttMessage();

        try {
            var prefix = settings.getValue("cloud.rootTopicPrefix");
            var responseTopic = mqttMessage.getProperties().getResponseTopic();

            if(responseTopic == null || responseTopic.length() == 0) {
                return;
            }

            if(responseTopic.length() > prefix.length() && responseTopic.startsWith(prefix)) {
                responseTopic = responseTopic.substring(prefix.length());
                mqttMessage.getProperties().setResponseTopic(responseTopic);
            }
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        var endpoint = (CaracalMqtt5Endpoint) super.getEndpoint();
        client.publish(endpoint.getTopic(), mqttMessage);
    }

    @Override
    protected void doStart() throws Exception {
        CaracalMqtt5Endpoint endpoint = (CaracalMqtt5Endpoint) super.getEndpoint();

        var tls = new TlsConfig();
        tls.getKeyStore().setStore(endpoint.getKeyStore());
        tls.getKeyStore().setPassword(endpoint.getKeyStorePassword());
        tls.getTrustStore().setStore(endpoint.getTrustStore());
        tls.getTrustStore().setPassword(endpoint.getTrustStorePassword());

        client = new Mqtt5Client(endpoint.getBrokerUrl(), tls);
        client.setUserName(endpoint.getUserName());
        client.setPassword(endpoint.getPassword());

        client.connect();
    }

    @Override
    protected void doStop() throws Exception {
        if(client == null)
            return;

        client.disConnectAndClose();
    }
}
