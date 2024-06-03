package com.senai.auth.DTO;

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
}
