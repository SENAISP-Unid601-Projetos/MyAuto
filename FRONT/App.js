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
        {/* <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
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


export default App; 
