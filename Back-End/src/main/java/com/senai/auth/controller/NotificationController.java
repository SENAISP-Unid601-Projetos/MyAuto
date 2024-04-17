package com.senai.auth.controller;

import org.springframework.web.bind.annotation.RestController;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.concurrent.ExecutionException;

@RestController
public class NotificationController {

	
	  @PostMapping("/send-notification")
	    public String sendNotification(@RequestBody NotificationRequest request) throws ExecutionException, InterruptedException {
	        Message message = Message.builder()
	                .setToken(request.getDeviceToken())
	                .putData("title", request.getTitle())
	                .putData("body", request.getBody())
	                .build();

	        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
	        return "Notification sent successfully: " + response;
	    }
}
