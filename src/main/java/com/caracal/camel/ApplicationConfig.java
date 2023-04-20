package com.caracal.camel;

import org.apache.camel.CamelContext;
import org.apache.camel.Configuration;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.spring.boot.CamelContextConfiguration;
import org.springframework.context.annotation.Bean;

@Configuration
public class ApplicationConfig {
    @Bean
    CamelContextConfiguration contextConfiguration() {
        return new CamelContextConfiguration() {
            @Override
            public void beforeApplicationStart(CamelContext camelContext) {
                createApplicationSettings(camelContext);


            }

            private void createApplicationSettings(CamelContext camelContext) {
                var properties = new PropertiesComponent();
                properties.addLocation("classpath:mqtt-properties.properties");
                properties.addLocation("classpath:http-employee.properties");
                properties.addLocation("classpath:mail.properties");

                camelContext.setPropertiesComponent(properties);
            }

            @Override
            public void afterApplicationStart(CamelContext camelContext) {
                setShutdownStrategy(camelContext);
            }

            private void setShutdownStrategy(CamelContext camelContext) {
                var shutdownStrategy = camelContext.getShutdownStrategy();
                shutdownStrategy.setTimeout(1);
                shutdownStrategy.setShutdownNowOnTimeout(true);
                shutdownStrategy.setSuppressLoggingOnTimeout(true);
                shutdownStrategy.setLogInflightExchangesOnTimeout(false);
                shutdownStrategy.setSuppressLoggingOnTimeout(true);
            }
        };
    }
}

/*
private void registerTrustStore(CamelContext camelContext) {

     try {
         KeyStore truststore = KeyStore.getInstance("JKS");
         truststore.load(getClass().getClassLoader().getResourceAsStream("example.jks"), "changeit".toCharArray());

         TrustManagerFactory trustFactory = TrustManagerFactory.getInstance("SunX509");
         trustFactory.init(truststore);

         SSLContext sslcontext = SSLContext.getInstance("TLS");
         sslcontext.init(null, trustFactory.getTrustManagers(), null);

         SSLSocketFactory factory = new SSLSocketFactory(sslcontext, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

         SchemeRegistry registry = new SchemeRegistry();
         final Scheme scheme = new Scheme("https4", 443, factory);
         registry.register(scheme);


         HttpComponent http4 = camelContext.getComponent("https4", HttpComponent.class);
         http4.setHttpClientConfigurer(new HttpClientConfigurer() {

             @Override
             public void configureHttpClient(HttpClientBuilder builder) {

                 builder.setSSLSocketFactory(factory);

                 Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create()
                         .register("https", factory)
                         .build();

                 HttpClientConnectionManager connectionManager = new  BasicHttpClientConnectionManager(registry);

                 builder.setConnectionManager(ccm);
             }
         });
     } catch (IOException e) {
         e.printStackTrace();
     } catch (NoSuchAlgorithmException e) {
         e.printStackTrace();
     } catch (CertificateException e) {
         e.printStackTrace();
     } catch (KeyStoreException e) {
         e.printStackTrace();
     } catch (KeyManagementException e) {
         e.printStackTrace();
     }
 }
 */