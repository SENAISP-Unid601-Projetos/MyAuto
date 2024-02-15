import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Agendamento from './Agendamento';

const HomeScreen = () => {
  const [agendamentoVisible, setAgendamentoVisible] = useState(false);


  return (
    <View style={styles.container}>
      {/* Retângulo roxo como cabeçalho */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'URL_DO_LOGO' }} // Insira a URL da imagem do logo aqui
          style={styles.logo}
        />
        <Text style={styles.headerText}>Bem-vindo ao MyAuto</Text>
      </View>

      {/* Foto de perfil e botão Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://cdn.sistemawbuy.com.br/arquivos/2e6ddbbfd31f6f862b8912e60cd11daf/produtos/648a1d9f71080/img_20230601_093339-01-648a1da942b71.jpeg' }}
          style={styles.profileImage}
        />
        <Button title="Perfil" onPress={() => console.log('Botão Perfil pressionado')} style={styles.footerButton} />
      </View>

      {/* Botão Agendar */}
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWithIcon}>
      <Icon name="calendar" size={30} color="black" style={styles.icon} />
      <TouchableOpacity onPress={() =>  setAgendamentoVisible(true)}  style={styles.footerButton} >
        <Text style={styles.ButtonText}>AGENDAR</Text>
      </TouchableOpacity>
      </View>
      </View>

      {/* Restante dos botões */}
      <View style={styles.buttonContainer}>
        {/* Botão Notificações */}
        <View style={styles.buttonWithIcon}>
          <Icon name="bell" size={30} color="black" style={styles.icon} />
          <Button title=" Notificações " onPress={() => console.log('Botão Notificações pressionado')}/>
        </View>

        {/* Botão Relatórios */}
        <View style={styles.buttonWithIcon}>
          <Icon name="file-text" size={30} color="black" style={styles.icon} />
          <Button title="  Relatórios     " onPress={() => console.log('Botão Relatórios pressionado')}/>
        </View>
      </View>

      {/* Retângulo roxo como rodapé */}
      <View style={styles.footerContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'purple',
    borderWidth: 4,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 100, // Ajuste conforme necessário
    height: 100, // Ajuste conforme necessário
    marginBottom: 10,
  },
  profileContainer: {
    position: 'absolute',
    top: 36, // Aumentei a distância para o conteúdo central
    right: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 13,
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
  buttonContainer: {
    marginBottom: 24,
  },
  footerContainer: {
    backgroundColor: 'purple',
    padding: 10,
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30, // Aumentei a distância para o conteúdo central
    borderWidth: 4,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;