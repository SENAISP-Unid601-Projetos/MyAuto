package com.senai.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senai.auth.entities.Agendamento;
import com.senai.auth.repository.AgendamentoRepository;
import com.senai.auth.service.AgendamentoService;

@RestController
@RequestMapping("/api")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired // Adicione esta anotação para injetar o AgendamentoRepository
    private AgendamentoRepository agendamentoRepository;

    @PostMapping("/agendamento")
    public ResponseEntity<Agendamento> agendarServico(@RequestBody Agendamento request) {
        try {
            Agendamento novoAgendamento = agendamentoService.agendarServico(request.getData(), request.getHorario());
            return ResponseEntity.ok(novoAgendamento);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/agendamento")
    public Iterable<Agendamento> findAllAgendamentos() {
        return agendamentoRepository.findAll();
    }
}