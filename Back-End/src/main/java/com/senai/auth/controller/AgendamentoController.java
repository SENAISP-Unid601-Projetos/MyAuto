package com.senai.auth.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senai.auth.entities.Agendamento;
import com.senai.auth.service.AgendamentoService;

@RestController
@RequestMapping("/api")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping("/agendamentos")
    public ResponseEntity<String> agendarServico(@RequestBody Agendamento request) {
        try {
            agendamentoService.agendarServico(request.getData(), request.getHorario());
            return ResponseEntity.ok("Serviço agendado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao agendar serviço");
        }
    }
}
