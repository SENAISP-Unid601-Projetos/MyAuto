package com.senai.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senai.auth.entities.Agendamento;
import com.senai.auth.repository.AgendamentoRepository;
import com.senai.auth.service.AgendamentoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/api")
public class AgendamentoController {
    private static final Logger logger = LoggerFactory.getLogger(AgendamentoController.class);

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private AgendamentoRepository agendamentoRepository;


    @PostMapping("/agendamento")
    public ResponseEntity<Agendamento> agendarServico(@RequestBody Agendamento request) {
        logger.info("Recebendo requisição de agendamento: {}", request);
        try {
            Agendamento novoAgendamento = agendamentoService.agendarServico(
                    request.getData(),
                    request.getHorario(),
                    request.getLocal(),
                    request.getNomeOficina(),
                    request.getTipoServico(),
                    request.getImagem()
            );
            return ResponseEntity.ok(novoAgendamento);
        } catch (Exception e) {
            logger.error("Erro ao agendar serviço", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/agendamento")
    public Iterable<Agendamento> findAllAgendamentos() {
        return agendamentoRepository.findAll();
    }
}
