package com.caracal.camel;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeHttpRequests(requests -> requests
            .requestMatchers("/api/external/employee").permitAll()
            .requestMatchers("/api/demo/**").permitAll()
            .requestMatchers("/api/auth/authenticate", "/api/auth/user").permitAll()
            .requestMatchers("/actuator/**", "/mgmt/**").permitAll()
            .requestMatchers("/error", "/js/**", "/css/**").permitAll()
            .anyRequest().authenticated()
        );
        http.formLogin();
        return http.build();
    }

    @Bean(name="myPasswordEncoder")
    public PasswordEncoder getPasswordEncoder() {
        DelegatingPasswordEncoder delPasswordEncoder=  (DelegatingPasswordEncoder) PasswordEncoderFactories.createDelegatingPasswordEncoder();
        BCryptPasswordEncoder bcryptPasswordEncoder =new BCryptPasswordEncoder();
        delPasswordEncoder.setDefaultPasswordEncoderForMatches(bcryptPasswordEncoder);
        return delPasswordEncoder;
    }

    @Bean
    public UserDetailsService users() {
        PasswordEncoder encoder = getPasswordEncoder();

        UserDetails admin = User.builder()
                .username("admin")
                .password(encoder.encode("password"))
                .roles("ADMIN")
                .build();

        UserDetails sup = User.builder()
                .username("user")
                .password("password")
                .roles("ADMIN", "DBA")
                .build();

        return new InMemoryUserDetailsManager(admin, sup);
    }
}