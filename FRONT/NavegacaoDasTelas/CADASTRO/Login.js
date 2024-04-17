import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({navigation}) => {

  const botaoCadastrar=()=>{
    navigation.navigate('Cadastro');
  }
  const botaoTelaPrincipal=()=>{
    navigation.navigate('HomeScreen');
  }

  //Setando os metodos das informações do Usuário e a tela de Cadastro
  const [logarEmail, setLogarEmail] = useState('');
  const [logarSenha, setLogarSenha] = useState('');
  const [erro, setErro] = useState('');

  const VerificarLogin = async () => {
    setErro('');

    if (!logarEmail || !logarSenha) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    try {
      //Método para verificar se o usuário existe no banco
      const response = await axios.post('http://10.110.12.3:8080/api/usuarios/verificarDados', { 
        email: logarEmail,
        senha: logarSenha
      });

      if (response.status !== 200) {
        throw new Error('Erro ao tentar logar');
      }
      botaoTelaPrincipal();
      //Manda a mensagem para o Prompt pra verificar se a tela recebeu o usuário
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
    //Tela para logar
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
      <TouchableOpacity style={styles.button} onPress={VerificarLogin} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={botaoCadastrar} style={styles.button}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
      
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
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
