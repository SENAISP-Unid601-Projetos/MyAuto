package com.senai.auth.DTO;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senai.auth.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarroDTO {

    private Long id;
    private String placa;
    private String marca;
    private String modelo;
    private Integer ano;
    private Integer km;
    private Integer mediaKm;
    private String uso;
    private String cambio;
    private String combustivel;
    private Integer calc;
    private Long usuario;
}
