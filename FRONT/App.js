import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Agendamento from './Agendamento.js';
import LoginScreen from './CADASTRO/Login.js';
import CadastroCarroScreen from './CADASTRO/CadastroCarro.js';
import TelaDeNotificacao from './TelaDeNotificacao.js';

const HomeScreen = () => {
  const [agendamentoVisible, setAgendamentoVisible] = useState(false);
  const [carroVisible, setCarroVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false); // Novo estado para a tela de notificação

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true' }}
          style={styles.logo}
        />
      </View>

      {/* Foto de perfil e botão Perfil */}
      <View style={styles.profileContainer}>
        <View style={styles.botaoImagemLogin}>
          <Image
            source={{ uri: 'https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png' }}
            style={styles.profileImage}
          />
          <View style={styles.buttonWithIcon}>
            <TouchableOpacity onPress={() => setLoginVisible(true)} style={styles.botaologin} >
              <Text style={styles.ButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Retângulo roxo como rodapé */}
      <View style={styles.footerContainer}>
        <View style={styles.cadastroCarro}>
          <Icon style={styles.icon} name='plus' size={30} color='white' onPress={() => setCarroVisible(true)} />
        </View>

        {/* Botão Agendar */}
        {/* Restante dos botões */}
        <View style={styles.alinhaBotao}>
          <View style={styles.buttonRodape}>
            <Icon style={styles.icon} name="calendar" size={30} color="black" onPress={() => setAgendamentoVisible(true)} />
          </View>
          {/* Botão Notificações */}
          <View style={styles.buttonRodape}>
            <Icon name="bell" size={30} color="black" style={styles.icon} onPress={() => setNotificationVisible(true)} />
          </View>
          {/* Botão Relatórios */}
          <View style={styles.buttonRodape}>
            <Icon name="car" size={30} color="black" style={styles.icon} onPress={() => console.log('Botão Informações pressionado')} />
          </View>
        </View>
      </View>

      {/* Modal de Agendamento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={agendamentoVisible}
        onRequestClose={() => setAgendamentoVisible(false)}
      >
        <Agendamento closeModal={() => setAgendamentoVisible(false)} />
      </Modal>

      {/* Modal de Login */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loginVisible}
        onRequestClose={() => setLoginVisible(false)}
      >
        <LoginScreen closeModal={() => setLoginVisible(false)} />
      </Modal>

      {/* Modal de Cadastro de Carro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={carroVisible}
        onRequestClose={() => setCarroVisible(false)}
      >
        <CadastroCarroScreen closeModal={() => setCarroVisible(false)} />
      </Modal>

      {/* Modal de Notificação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationVisible}
        onRequestClose={() => setNotificationVisible(false)}
      >
        <TelaDeNotificacao closeModal={() => setNotificationVisible(false)} />
      </Modal>
    </View>
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

export default HomeScreen;