package com.senai.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.senai.auth.entities.Agendamento;

import java.util.List;


@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    public Agendamento findBydata(String data);

    @Query("SELECT a FROM Agendamento a WHERE a.usuario.id = :usuarioId")
    public List<Agendamento> findByUsuarioId(@Param("usuarioId") Long usuarioId);

}
