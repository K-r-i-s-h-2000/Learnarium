package com.example.online_learning_platform.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/online-learning-platform/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("OPTIONS", "GET", "POST","PATCH","DELETE","PUT")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

