package com.senai.auth.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import com.senai.auth.entities.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {
	public Carro findByKm(Integer km);
}
