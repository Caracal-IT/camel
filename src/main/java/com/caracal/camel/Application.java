package com.caracal.camel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootApplication(exclude = {
		DataSourceAutoConfiguration.class,
		DataSourceTransactionManagerAutoConfiguration.class,
		HibernateJpaAutoConfiguration.class})
@Import({
		com.caracal.camel.web.controllers.HomeController.class,
		com.caracal.camel.web.controllers.MqttController.class,
		com.caracal.camel.web.controllers.ExternalEmployeeController.class,
		com.caracal.camel.web.controllers.JwtAuthenticationController.class,
		SecurityConfig.class,
		ApplicationConfig.class})
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
