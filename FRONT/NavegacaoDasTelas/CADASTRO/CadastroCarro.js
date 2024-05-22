import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

const CadastroCarroScreen = ({navigation}) => {
  //Setando os metodos das informações do carro
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [km, setKm] = useState('');
  const [mediaKm, setMediaKm] = useState('');
  const [uso, setUso] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [cambio, setCambio] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [erro, setErro] = useState('');
  const [valorCookie, setValorCookie] = useState('');

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    console.log("esse ", valorDoCookie)
    setValorCookie(valorDoCookie);
    return valorDoCookie;
  };

  useEffect(() => {
    setValorCookie(getCookie());
  }, []);

  const calc=()=>{
    return parseInt((10000 / mediaKm) / frequencia);
  }

  const botaoVoltar=()=>{
    navigation.goBack();
  }

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
    const media = calc();

    //Dados do carro
    const dados = {
      "marca": marca,
      "modelo": modelo,
      "ano": formattedDate,
      "km": km,
      "mediaKm": mediaKm,
      "uso": uso,
      "cambio": cambio,
      "combustivel": combustivel,
      "calc":  media,
      "usuario": valorCookie
    };

    console.log(dados);


    
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
      Alert.alert("Sucesso!","Próxima troca de oleo em: "+calc()+" dias.");
      botaoVoltar();
    })
    .catch(error => {
      console.error('Ocorreu um erro ao cadastrar seu Carro:', error);
    });
    
  };

  return (
    //Tela para Colocar as informações do carro
    <ScrollView>
    <View style={styles.container}>

      <View style={styles.botaoVoltar}>
        <TouchableOpacity  style={styles.voltar} >
          <Icon name="arrow-left" size={24} color="white" onPress={botaoVoltar}/>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.obcaoDeCelecao}>
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
      <Text style={styles.label}>KM DO RELOGIO ATUALMENTE:</Text>
      <TextInput
        style={styles.input}
        value={km}
        maxLength={5}
        onChangeText={setKm}
        keyboardType="numeric"
      />
      {/*Aba para colocar a KM*/}
      <Text style={styles.label}>MEDIA DE KM DIÁRIO:</Text>
      <TextInput
        style={styles.input}
        value={mediaKm}
        maxLength={6}
        onChangeText={setMediaKm}
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
      {/*Aba para colocar a USO*/}
      <Text style={styles.label}>FREQUENCIA:</Text>

      <View style={styles.input}>
      <Picker
      selectedValue={frequencia}
      onValueChange={(itemValue)=> setFrequencia(itemValue)}
      keyboardType="numeric"
      >
        <Picker.Item label='Selecionar' value={(null)}/>
        <Picker.Item label='Frequentemente' value={1.5}/>
        <Picker.Item label='Razoavel' value={1}/>
        <Picker.Item label='Ocasionalmente' value={1.3}/>

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
      <View style={styles.btncadastro}>
        <Pressable  onPress={Criar} style={styles.btn}>
          <Text style={styles.texto}>Cadastrar</Text>
        </Pressable>
      </View>
      {erro !== '' && <Text style={styles.error}>{erro}</Text>}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center',
    //alignItems: 'center',
    //paddingHorizontal: 20,
  },

  obcaoDeCelecao:{
    top: "1.5%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0226',
    borderRadius: 60,
    marginHorizontal:15,
    padding: '6%'
  },

  voltar:{
    marginHorizontal: 10,
    top: 45,
    paddingHorizontal: 20,
  },

  botaoVoltar:{
    //marginTop: '8%',
    height: '12%',
    backgroundColor: '#0A0226'
  },
  label: {
    //marginHorizontal: 110,
    fontSize: 18,
    marginBottom: 5,
    //backgroundColor: 'white',
    color: 'white'
    //fontStyle: ''
  },
  input: {
    width: '90%',
    height:50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 11,
    backgroundColor: '#FFF9C4',

  },
  btncadastro:{
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 16,
    top:"5%",
    //bottom:'0%',
    //borderRadius: '10%'
  },
  btn:{
    //alignItems: 'center',
    backgroundColor: '#2196f3',
    color: 'white',
    alignItems: 'center',
    borderRadius: 20,
    width: 115,
    height:40,
    justifyContent: 'center',
  },
  texto:{
    fontSize: 18,
    color: 'white',
    fontFamily: "Roboto"
  },
  logo: {
    marginTop: '-1.1%',
    width: 100, // Ajuste conforme necessário
    height: 100, // Ajuste conforme necessário
    margin:'37%',
  },
});

export default CadastroCarroScreen;
