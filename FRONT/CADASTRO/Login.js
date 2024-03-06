import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import CadastroScreen from './Cadastro.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cadastroVisible, setCadastro] = useState(false);

  const VerificarLogin =()=>{
    if(email==='usuario@exemplo.com' && password==='123456'){
      console.log('Login Bem Sucedido!!');

      console.log('Email:', email);
      
      console.log('Password:', password);
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
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
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
        <CadastroScreen closeModal={()=> setCadastro(false)}/>
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
