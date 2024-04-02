import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CadastroCarroScreen = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [km, setKm] = useState('');


  const formatarDataDeNascimento = (dia, mes, ano) => {
    return `${ano}-${mes}-${dia}`;
  };

  const validarData = (dia, mes, ano) => {
    const dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19\d{2}|20[01]\d|202[0-4])$/;
  
    if (dataRegex.test(`${dia}/${mes}/${ano}`)) {
      return 'Data de nascimento inválida.';
    } else {
      return '';
    }
  };
  
  

  const Criar = () => {
    setErro('');

    if (!email || senha == 0) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    validarData();

    if (erro) {
      return;
    }

    const formattedDate = formatarDataDeNascimento(dia,mes,ano);

    const dados = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "cpf": cpf,
      "dataDeNascimento": formattedDate,
      "sexo": sexo
    };

    //console.log(dados);

    
    fetch('http://10.110.12.3:8080/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao tentar criar usuário');
      }
      return response.json();
    })
    .then(dados => {
      console.log('Usuário criado com sucesso:', dados);
    })
    .catch(error => {
      console.error('Ocorreu um erro ao tentar criar usuário:', error);
    });
    
  };



  const handleCadastro = () => {
    // Lógica para enviar os dados do carro para o backend ou realizar outras ações
    console.log('Marca:', marca);
    console.log('Modelo:', modelo);
    console.log('Ano:', ano);
    console.log('KM:', km);
    // Aqui você pode enviar os dados para o backend.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={text => setMarca(text)}
      />
      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={text => setModelo(text)}
      />
      <Text style={styles.label}>Ano:</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={text => setAno(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>KM:</Text>
      <TextInput
        style={styles.input}
        value={km}
        onChangeText={text => setKm(text)}
        keyboardType="numeric"
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CadastroCarroScreen;
