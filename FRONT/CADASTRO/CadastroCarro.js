import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CadastroCarroScreen = () => {
  //Setando os metodos das informações do carro
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [km, setKm] = useState('');
  const [uso, setUso] = useState('');
  const [cambio, setCambio] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [erro, setErro] = useState('');


  const formatarData = (ano) => {
    return `${ano}`;
  };  
  
  //Criando o carro no banco pelo Back End
  const Criar = () => {

    //Mostra no console se a tela está pegando as informações
    console.log('Marca:', marca);
    console.log('Modelo:', modelo);
    console.log('Ano:', ano);
    console.log('KM:', km);

    setErro('');

    const formattedDate = formatarData(ano);

    //Dados do carro
    const dados = {
      "marca": marca,
      "modelo": modelo,
      "ano": formattedDate,
      "km": km,
      "uso": uso,
      "cambio": cambio,
      "combustivel": combustivel
    };

    //console.log(dados);

    
    fetch('http://10.110.12.3:8080/api/carros', { //metodo para chamar a API usando o feth
      method: 'POST', //Usamos o POST para postar no banco as informações
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar seu carro');
      }
      return response.json();
    })
    .then(dados => {
      console.log('Carro cadastrado com sucesso:', dados);
    })
    .catch(error => {
      console.error('Ocorreu um erro ao cadastrar seu Carro:', error);
    });
    
  };

  return (
    //Tela para Colocar as informações do carro
    <View style={styles.container}>
      {/*Aba para colocar a marca*/}
      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />
      {/*Aba para colocar a Modelo*/}
      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />
      {/*Aba para colocar a Ano*/}
      <Text style={styles.label}>Ano:</Text>
      <TextInput
        style={styles.input}
        maxLength={4}
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />
      {/*Aba para colocar a KM*/}
      <Text style={styles.label}>KM:</Text>
      <TextInput
        style={styles.input}
        value={km}
        maxLength={6}
        onChangeText={setKm}
        keyboardType="numeric"
      />
      {/*Aba para colocar a USO*/}
      <Text style={styles.label}>USO:</Text>

      <View style={styles.input}>
      <Picker
      selectedValue={uso}
      onValueChange={(itemValue)=> setUso(itemValue)}
      >
        <Picker.Item label='Selecionar' value={(null)}/>
        <Picker.Item label='Uber' value='Uber'/>
        <Picker.Item label='Viagens' value='Viagens'/>
        <Picker.Item label='Trabalho' value='Trabalho'/>
        <Picker.Item label='Entregas' value='Entregas'/>
        <Picker.Item label='Rural' value='Rural'/>
        <Picker.Item label='Passeio' value='Passeio'/>
      </Picker>
      </View>

      {/*Aba para colocar a CAMBIO*/}
      <Text style={styles.label}>CAMBIO:</Text>

      <View style={styles.input}>
      <Picker
      selectedValue={cambio}
      onValueChange={(itemValue)=> setCambio(itemValue)}
      >
        <Picker.Item label='Selecionar' value={(null)}/>
        <Picker.Item label='Manual' value='Manual'/>
        <Picker.Item label='Automático' value='Automatico'/>
      </Picker>
      </View>
      {/*Aba para colocar a COMBUSTIVEL*/}
      <Text style={styles.label}>COMBUSTIVEL:</Text>
      <View style={styles.input}>
      <Picker
      selectedValue={combustivel}
      onValueChange={(itemValue)=> setCombustivel(itemValue)}
      >
        <Picker.Item label='Selecionar' value={(null)}/>
        <Picker.Item label='Gasolina' value='Gasolina'/>
        <Picker.Item label='Diesel' value='Diesel'/>
        <Picker.Item label='Etanol' value='Etanol'/>
        <Picker.Item label='Flex' value='Flex'/>
      </Picker>
      </View>
      <Button title="Cadastrar" onPress={Criar} />
      {erro !== '' && <Text style={styles.error}>{erro}</Text>}
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
