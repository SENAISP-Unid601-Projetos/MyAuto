import React, { useState } from 'react';
import { View, Text, TextInput,Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [erro, setErro] = useState('');

  const Criar = () => {
    setErro('');

    if (!email || senha == 0) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    const data = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "cpf": cpf,
      "dataDeNascimento": dataDeNascimento,
      "sexo": sexo
    };
    
    fetch('http://10.110.12.3:8080/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao tentar criar usuário');
      }
      return response.json();
    })
    .then(data => {
      console.log('Usuário criado com sucesso:', data);
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
        keyboardType="email-address"
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

       <Text style={styles.label}>Digite a DATA DE NASCIMENTO:</Text>
      <TextInput
        style={styles.input}
        placeholder="DATA DE NASCIMENTO"
        keyboardType=""
        value={dataDeNascimento}
        onChangeText={setDataDeNascimento} 
      />

        <Text style={styles.label}>Digite o SEXO:</Text>
        <Picker
        selectedValue={sexo}
        style={styles.input}
        onValueChange={(itemValue) => setSexo(itemValue)}
      >
        <Picker.Item label="Homem" value="Homem" keyboardType=""/>
        <Picker.Item label="Mulher" value="Mulher" keyboardType="" />
        <Picker.Item label="Prefiro Não Opinar" value="Prefiro Não Opinar" keyboardType="" />
      </Picker>
    


      <Text style={styles.label}>Digite a SENHA:</Text>
      <TextInput
      style={styles.input}
      placeholder='SENHA'
      keyboardType=""
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