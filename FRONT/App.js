import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./NavegacaoDasTelas/CADASTRO/Login";
import HomeScreen from "./NavegacaoDasTelas/telaPrincipal";
import Cadastro from "./NavegacaoDasTelas/CADASTRO/Cadastro.js";
import Agendamento from "./NavegacaoDasTelas/Agendamento.js";
import CadastroCarroScreen from "./NavegacaoDasTelas/CADASTRO/CadastroCarro.js";
import TelaDeNotificacao from "./NavegacaoDasTelas/TelaDeNotificacao.js";
import Abertura from "./NavegacaoDasTelas/Abertura.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Abertura">
        <Stack.Screen
        name="Abertura"
        component={Abertura}
        options={{headerShown: false}}
        />
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

export default App;
