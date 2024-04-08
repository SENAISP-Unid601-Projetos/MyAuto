package com.senai.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.auth.entities.Agendamento;


@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

}
