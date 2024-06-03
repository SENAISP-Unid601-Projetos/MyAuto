package com.senai.auth.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senai.auth.DTO.AgendamentoDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Agendamento implements Serializable {

	
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	  	
	    private String data;

		private String local;

		private String nomeOficina;

		private String tipoServico;

		private String imagem;
	    
	    @Column(nullable = true)
	    private String horario;
	@JsonIgnore

	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	private Usuario usuario;
	public static Agendamento fromAgendamentoDTO(AgendamentoDTO agendamentoDTO) {
		Agendamento agendamento = new Agendamento();
		agendamento.setId(agendamentoDTO.getId());
		agendamento.setData(agendamentoDTO.getData());
		agendamento.setLocal(agendamentoDTO.getLocal());
		agendamento.setNomeOficina(agendamentoDTO.getNomeOficina());
		agendamento.setTipoServico(agendamentoDTO.getTipoServico());
		agendamento.setImagem(agendamentoDTO.getImagem());
		agendamento.setHorario(agendamentoDTO.getHorario());
		Usuario user = new Usuario();
		user.setId(agendamentoDTO.getUsuario());
		agendamento.setUsuario(user);

		return agendamento;
	}
	    
}