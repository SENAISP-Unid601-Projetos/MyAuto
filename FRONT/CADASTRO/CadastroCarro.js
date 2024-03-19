import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CadastroCarroScreen = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const handleCadastro = () => {
    // Lógica para enviar os dados do carro para o backend ou realizar outras ações
    console.log('Marca:', marca);
    console.log('Modelo:', modelo);
    console.log('Ano:', ano);
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
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
