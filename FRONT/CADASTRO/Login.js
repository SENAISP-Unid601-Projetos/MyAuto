import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import Cadastro from './Cadastro.js';

const LoginScreen = () => {
  const [confirmarEmail, setEmail] = useState('');
  const [confirmarSenha, setPassword] = useState('');
  const [cadastroVisible, setCadastro] = useState(false);
  const [erro, setErro] = useState('');

  const VerificarLogin =()=>{
    setErro('');

    if (!email || senha == 0) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    validarData();

    if (erro) {
      return;
    }

    const dados = {
      "email": email,
      "senha": senha,
    }
  

    fetch('http://10.110.12.3:8080/api/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao tentar entar');
      }
      return response.json();
    })
    .then(dados => {
      console.log('Usuário criado com sucesso:', dados);
    })
    .catch(error => {
      console.error('Ocorreu um erro ao tentar criar usuário:', error);
    });



    if(confirmarEmail==email && confirmarSenha==senha){
      console.log('Login Bem Sucedido!!');

      console.log('Email:', confirmarEmail);
      
      console.log('Password:', confirmarSenha);
    }else{
      Alert.alert('Senha e/ou Email errado.')
    };
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={confirmarEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={confirmarSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={VerificarLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setCadastro(true)} style={styles.button}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      <Modal
       animationType="slide"
       transparent={true}
       visible={cadastroVisible}
       onRequestClose={()=> setCadastro(false)}
      >
        <Cadastro closeModal={()=> setCadastro(false)}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
