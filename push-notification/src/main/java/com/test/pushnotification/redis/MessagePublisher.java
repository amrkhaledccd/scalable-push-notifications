package com.test.pushnotification.redis;

import com.test.pushnotification.payload.RedisNotificationPayload;

public interface MessagePublisher {
    void publish(final RedisNotificationPayload message);
}