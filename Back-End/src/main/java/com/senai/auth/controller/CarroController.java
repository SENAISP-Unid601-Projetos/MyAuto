package com.senai.auth.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.senai.auth.entities.Carro;
import com.senai.auth.repository.CarroRepository;

@RestController
@RequestMapping("/api/carros")
public class CarroController {
	@Autowired
	private CarroRepository carroRepository;
	
	@GetMapping
	public List<Carro> listarCarros(){
		return carroRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Carro> obterCarro(@PathVariable Long id){
		Carro carro = carroRepository.findById(id).orElse(null);
		return carro != null ? ResponseEntity.ok(carro) : ResponseEntity.notFound().build();
	}
	
	@PostMapping()
	public ResponseEntity<Carro> criarCarro(@Valid @RequestBody Carro carro){
        try {
            Carro novoCarro = carroRepository.save(carro);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoCarro);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Carro> atualizarCarro(@PathVariable Long id, @Valid @RequestBody Carro carroAtualizado){
		Carro carroExistente = carroRepository.findById(id).orElse(null);
		
		if(carroExistente!= null) {
			carroExistente.setKm(carroAtualizado.getKm());
			carroExistente.setUso(carroAtualizado.getUso());
			Carro carroAtualizadoSalvo = carroRepository.save(carroExistente);
			return ResponseEntity.ok(carroAtualizadoSalvo);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Carro> deletarCarro(@PathVariable Long id){
		carroRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
