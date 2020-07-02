package com.test.pushnotification.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RedisNotificationPayload {
    private String username;
    private String from;
    private String message;
}
