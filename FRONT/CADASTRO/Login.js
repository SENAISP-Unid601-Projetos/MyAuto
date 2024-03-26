import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import Cadastro from './Cadastro.js';
import axios from 'axios';

const LoginScreen = () => {

  const [email] = useState('');
  const [senha] = useState('');
  const [logarEmail, setLogarEmail] = useState('');
  const [logarSenha, setLogarSenha] = useState('');
  const [cadastroVisible, setCadastro] = useState(false);
  const [erro, setErro] = useState('');

  const VerificarLogin = async () => {
    setErro('');

    if (!logarEmail || !logarSenha) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    try {
      const response = await axios.post('http://10.110.12.3:8080/api/usuarios/verificarDados', {
        email: logarEmail,
        senha: logarSenha
      });

      if (response.status !== 200) {
        throw new Error('Erro ao tentar logar');
      }

      console.log('Logado:', response.data);

      console.log('Login Bem Sucedido!!');
      console.log('Email:', logarEmail);
      console.log('Senha:', logarSenha);

    } catch (error) {
      console.error('Ocorreu um erro ao tentar logar:', error);
      Alert.alert('Ocorreu um erro ao tentar logar:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setLogarEmail(text)}
        value={logarEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setLogarSenha(text)}
        value={logarSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={VerificarLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setCadastro(true) }} style={styles.button}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={cadastroVisible}
        onRequestClose={() => setCadastro(false)}
      >
        <Cadastro closeModal={() => setCadastro(false)} />
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
