package com.senai.auth.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private Integer cpf;
    private String dataDeNacimento;
    private String sexo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getCpf() {
    	return cpf;
    }
    
    public void setCpf(Integer cpf) {
		this.cpf = cpf;
	}
    
    public String getDataDeNacimento() {
    	return dataDeNacimento;
    }
    
    public void setDataDeNacimento(String dataDeNacimento) {
		this.dataDeNacimento = dataDeNacimento;
	}
    
    public String getSexo(){
    	return sexo;
    }
    
    public void setSexo(String sexo) {
		this.sexo = sexo;
	}
}
