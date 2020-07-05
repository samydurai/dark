package com.darkim.chat.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class UserPresenceCacheConfig {

    private CacheRemovalListener cacheRemovalListener;

    @Autowired
    public void setCacheRemovalListener(CacheRemovalListener cacheRemovalListener) {
        this.cacheRemovalListener = cacheRemovalListener;
    }

    @Bean
    public Caffeine userPresenceCaffeineCacheConfig() {
        return Caffeine.newBuilder()
                .scheduler(Scheduler.systemScheduler())
                .maximumSize(10000)
                .removalListener(cacheRemovalListener)
                .expireAfterWrite(10, TimeUnit.SECONDS);
    }

    @Bean
    public CacheManager userPresenceCacheManager() {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager("user_state");
        caffeineCacheManager.setCaffeine(userPresenceCaffeineCacheConfig());
        return caffeineCacheManager;
    }
}
