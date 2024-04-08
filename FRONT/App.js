//Aqui onde são colocadas todas as telas e onde são chamadas

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./CADASTRO/Login";
import HomeScreen from "./NavegacaoDasTelas/telaPrincipal";
import Cadastro from "./CADASTRO/Cadastro.js";
import Agendamento from "./NavegacaoDasTelas/Agendamento.js";
import CadastroCarroScreen from "./CADASTRO/CadastroCarro.js";
import TelaDeNotificacao from "./NavegacaoDasTelas/TelaDeNotificacao.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Agendamento"
          component={Agendamento}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroCarroScreen"
          component={CadastroCarroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaDeNotificacao"
          component={TelaDeNotificacao}
          options={{ headerShown: false }}
        />
 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    //padding: 16,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#0A0226',
    //borderWidth: 6,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    //justifyContent: 'center',
    //marginBottom: 14,
  },
  //headerText: {
   // fontSize: 18,
   // fontWeight: 'bold',
    //color: 'white',
 // },
  logo: {
    marginTop: 13,
    width: 100, // Ajuste conforme necessário
    height: 100, // Ajuste conforme necessário
    //marginBottom: 10,
  },
  alinhaBotao: {
    flexDirection:'row' ,
    //borderWidth: 4,
    //alignSelf:"stretch"
  },
  profileContainer: {
    //paddingLeft: -50,
    alignItems:'flex-start',
    position: 'absolute',
    top: 36, // Aumentei a distância para o conteúdo central
    right: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    //marginBottom: 10,
    
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonRodape:{
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    width: '34%',
  },
  icon: {
    margin: 10,
  },
  cadastroCarro:{
    position: 'relative',
    backgroundColor : 'black',
    borderRadius: 100
  },
  botaologin:{
    backgroundColor: '#2196f3',
    alignItems: 'center',
    borderRadius: 40,
    width: 70,
    height:30,
    justifyContent: 'center',
  },
  footerButton: { //Estilização dos Botões
    backgroundColor: '#2196f3',
    borderRadius: 2,
    width: 120,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },

  footerContainer: {
    backgroundColor: 'black',
    width: '100%',
    //position: 'relative',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  botaoImagemLogin: {
    alignItems: 'center'
  }
});

export default HomeScreen
