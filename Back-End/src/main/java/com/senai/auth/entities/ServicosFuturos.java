package com.senai.auth.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ServicosFuturos {
	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	
	private Date data;
	private String horarioDoServico;
	private String localDaManutencao;
	private Boolean realizada;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public String getHorarioDoServico() {
		return horarioDoServico;
	}
	public void setHorarioDoServico(String horarioDoServico) {
		this.horarioDoServico = horarioDoServico;
	}
	public String getLocalDaManutencao() {
		return localDaManutencao;
	}
	public void setLocalDaManutencao(String localDaManutencao) {
		this.localDaManutencao = localDaManutencao;
	}
	public Boolean getRealizada() {
		return realizada;
	}
	public void setRealizada(Boolean realizada) {
		this.realizada = realizada;
	}
	

	
	
}
