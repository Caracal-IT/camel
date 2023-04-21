package com.caracal.camel.web.services;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //https://www.javainuse.com/onlineBcrypt
        if ("admin".equals(username)) {
            return new User("admin", "$2a$10$k0OCqmqnw.7vXntoq8zwPu8E8btHAk47pBwCnt3FmHBq7bsFbO5iG",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
