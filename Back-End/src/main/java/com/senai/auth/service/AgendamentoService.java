package com.senai.auth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.auth.entities.Agendamento;
import com.senai.auth.repository.AgendamentoRepository;


@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento agendarServico(String data, String horario) {
        Agendamento agendamento = new Agendamento();
        agendamento.setData(data);
        agendamento.setHorario(horario);
        return agendamentoRepository.save(agendamento);
    }
}
