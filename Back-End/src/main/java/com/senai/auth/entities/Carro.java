package com.senai.auth.entities;


import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senai.auth.DTO.CarroDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Carro implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String placa;
	private String marca;
	private String modelo;
	private Integer ano;
	@Column(nullable = false)
	private Integer km;
	@Column(nullable = false)
	private Integer mediaKm;
	@Column(nullable = false)
	private String uso;
	@Column(nullable = false)
	private String cambio;
	@Column(nullable = false)
	private String combustivel;
	@Column(nullable = true)
	private Integer calc;
	@JsonIgnore


	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	private Usuario usuario;
	public static Carro fromCarroDTO(CarroDTO carroDTO) {
		Carro carro = new Carro();
		carro.setId(carroDTO.getId());
		carro.setPlaca(carroDTO.getPlaca());
		carro.setMarca(carroDTO.getMarca());
		carro.setModelo(carroDTO.getModelo());
		carro.setAno(carroDTO.getAno());
		carro.setKm(carroDTO.getKm());
		carro.setMediaKm(carroDTO.getMediaKm());
		carro.setUso(carroDTO.getUso());
		carro.setCambio(carroDTO.getCambio());
		carro.setCombustivel(carroDTO.getCombustivel());
		carro.setCalc(carroDTO.getCalc());
		Usuario user = new Usuario();
		user.setId(carroDTO.getUsuario());
		carro.setUsuario(user);
			return carro;
	}
}