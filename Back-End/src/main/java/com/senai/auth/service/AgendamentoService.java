package com.senai.auth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.auth.entities.Agendamento;
import com.senai.auth.repository.AgendamentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class AgendamentoService {
    private static final Logger logger = LoggerFactory.getLogger(AgendamentoService.class);
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento agendarServico(String data, String horario, String local, String nomeOficina, String tipoServico, String imagem) {
        Agendamento agendamento = new Agendamento();
        agendamento.setData(data);
        agendamento.setHorario(horario);
        agendamento.setLocal(local);
        agendamento.setNomeOficina(nomeOficina);
        agendamento.setTipoServico(tipoServico);
        agendamento.setImagem(imagem);

        return agendamentoRepository.save(agendamento);
    }
}
