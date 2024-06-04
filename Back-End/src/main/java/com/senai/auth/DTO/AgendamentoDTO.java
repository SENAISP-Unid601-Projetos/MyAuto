package com.senai.auth.DTO;

import com.senai.auth.entities.Agendamento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgendamentoDTO {

    private Long id;
    private String data;
    private String local;
    private String nomeOficina;
    private String tipoServico;
    private String imagem;
    private String horario;
    private Long usuario;

    public static AgendamentoDTO toDTO(Agendamento agendamento) {
        AgendamentoDTO dto = new AgendamentoDTO();
        dto.setId(agendamento.getId());
        dto.setData(agendamento.getData());
        dto.setLocal(agendamento.getLocal());
        dto.setNomeOficina(agendamento.getNomeOficina());
        dto.setTipoServico(agendamento.getTipoServico());
        dto.setImagem(agendamento.getImagem());
        dto.setHorario(agendamento.getHorario());
        dto.setUsuario(agendamento.getUsuario().getId());
        return dto;
    }
}
