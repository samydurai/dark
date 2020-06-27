package com.darkim.chat.auth.provider.config;

import com.darkim.chat.auth.api.LogoutHandlerImpl;
import com.darkim.chat.auth.jwt.JWTRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class SecurityProviderConfig extends WebSecurityConfigurerAdapter {

    private ChatUserDetailsService userDetailsService;

    private JWTRequestFilter jwtRequestFilter;

    @Autowired
    public void setJwtRequestFilter(JWTRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Autowired
    public void setUserDetailsService(ChatUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                .addLogoutHandler(new LogoutHandlerImpl())
                .logoutSuccessUrl("/")
                .and()
                .authorizeRequests().antMatchers("/api/**").authenticated()
                .and()
                .authorizeRequests().antMatchers("/api/authenticate", "/api/register", "/**").permitAll()
                .and()
                .exceptionHandling()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers()
                .xssProtection()
                .and()
                .addHeaderWriter(new StaticHeadersWriter("X-Content-Security-Policy","default-src 'self'"))
                .addHeaderWriter(new StaticHeadersWriter("X-WebKit-CSP","default-src 'self'"))
                .cacheControl()
                .and()
                .frameOptions()
                .sameOrigin()
                .contentTypeOptions();
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/api/authenticate", "/api/register", "/api/user/**");
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
