package com.senai.auth.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
	
	 @Bean
	    public FirebaseApp firebaseApp() throws IOException {
	        FileInputStream serviceAccount =
	                new FileInputStream("path/to/serviceAccountKey.json"); // Altere o caminho conforme suas credenciais

	        @SuppressWarnings("deprecation")//Se der erro retire essa linha e peça para o GPT ajudar
			FirebaseOptions options = new FirebaseOptions.Builder()
	                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
	                .build();

	        return FirebaseApp.initializeApp(options);
	    }
}
