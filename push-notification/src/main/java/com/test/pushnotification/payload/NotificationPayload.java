package com.test.pushnotification.payload;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationPayload {
    private String name;
    private String msg;
}
