import React, { useState } from 'react';
import { View, Text, TextInput,Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState(''); 
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  //const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [erro, setErro] = useState('');

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

   // console.log(formattedDate);

    const dados = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "cpf": cpf,
      "dataDeNascimento": formattedDate,
      "sexo": sexo
    };

    //console.log(dados);

    
    fetch('http://10.110.12.20:8080/api/usuarios', {
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

  return (
    <View style={styles.container}>
       <Text style={styles.label}>Digite o EMAIL:</Text>
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Digite o NOME:</Text>
      <TextInput
        style={styles.input}
        placeholder="NOME"
        keyboardType="name-phone-pad"
        value={nome}
        onChangeText={setNome}
      />

       <Text style={styles.label}>Digite o CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={8}
        value={cpf}
        onChangeText={setCpf} 
      />

      <Text style={styles.label}>DATA DE NASCIMENTO:</Text>
      <View style={styles.dataNascimentoInput}>
        <TextInput
          style={[styles.input, { width: '30%' }]}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={dia}
          onChangeText={setDia}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        <TextInput
          style={[styles.input, { width: '30%' }]}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={mes}
          onChangeText={setMes}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        <TextInput
          style={[styles.input, { width: '40%' }]}
          placeholder="AAAA"
          keyboardType="numeric"
          maxLength={4}
          value={ano}
          onChangeText={setAno}
        />
      </View>

        <Text style={styles.label}>Digite o SEXO:</Text>
        <Picker
        selectedValue={sexo}
        style={styles.input}
        onValueChange={(itemValue) => setSexo(itemValue)}
      >
        <Picker.Item label='' value=''/>
        <Picker.Item label="Homem" value="Homem"/>
        <Picker.Item label="Mulher" value="Mulher" />
        <Picker.Item label="Prefiro Não Opinar" value="Prefiro Não Opinar"/>
      </Picker>
    


      <Text style={styles.label}>Digite a SENHA:</Text>
      <TextInput
      style={styles.input}
      placeholder='SENHA'
      value={senha}
      onChangeText={setSenha}
      secureTextEntry={true}
      />
      <Button title="Criar Conta" onPress={Criar} />

      {erro !== '' && <Text style={styles.error}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  dataNascimentoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Cadastro;