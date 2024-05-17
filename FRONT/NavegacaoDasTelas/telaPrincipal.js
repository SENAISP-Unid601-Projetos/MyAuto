import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity  } from 'react-native';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {
  //Chamando as telas de cadastro, login e notificação
    const botaologin =()=>{
        navigation.navigate('LoginScreen');
    }

    const botaoCarro =()=>{
        navigation.navigate('CadastroCarroScreen');
    }

    const botaoNotificacao =()=>{
        navigation.navigate('TelaDeNotificacao');
        
    }

    const botaoAgendar =()=>{
        navigation.navigate('Agendamento');
        
    }

    
  const [agendamentosFuturos, setAgendamentosFuturos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('realizados');
    
  useEffect(() => {
    // Substitua a URL abaixo pela URL da sua API
    fetch('http://10.110.12.17:8080/api/agendamento')
       .then(response => {
         if (response.ok) {
           return response.json();
         } else {
           throw new Error('Erro ao obter os agendamentos');
         }
       })
       .then(data => {
         setAgendamentosFuturos(data);
       })
       .catch(error => {
         console.error('Erro ao obter os agendamentos:', error);
         setError(error.message); // Define o erro no estado de erro
       });
     },  []);


  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        {/*Imagem da logo*/}
        <Image
          source={{ uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true' }}
          style={styles.logo}
        />
      </View>

      {/* Foto de perfil e botão Perfil */}
      <View style={styles.profileContainer}>
        <View style={styles.botaoImagemLogin}>
          {/*Imagem de login*/}
          <Image
            source={{ uri: 'https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png' }}
            style={styles.profileImage}
          />
          <View style={styles.buttonWithIcon}>
           <TouchableOpacity onPress={botaologin}  style={styles.botaologin}>
            <Text style={styles.ButtonText}>Login</Text>
           </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.servisoRealizado}>
      {error  ? (
        // Renderiza o erro se ocorrer
        <View>
          <Text>Ocorreu um erro ao carregar os serviços realizados.</Text>
        </View>
      ) :  (
        <View>
          <Text style={styles.texto}>Serviços Futuros</Text>
          <View  style={styles.diasAgendados}>
          {agendamentosFuturos.map((agendamento, index) => (
            <Text key={index}>{agendamento.data} - {agendamento.horario}</Text>
          ))}
          </View>
        </View>
      )}
      </View>

      {/* Retângulo roxo como rodapé */}
      <View style={styles.footerContainer}>

        {/* Botão Agendar */}
        {/* Restante dos botões */}
        <View style={styles.alinhaBotao}>
          <View style={styles.buttonRodape}>
            <AntDesign style={styles.icon} name="calendar" size={30} color="black" onPress={botaoAgendar} />
          </View>
          {/* Botão Notificações */}
          <View style={styles.buttonRodape}>
            <AntDesign name="bells" size={30} color="black" style={styles.icon} onPress={botaoNotificacao} />
          </View>
          {/* Botão Relatórios */}
          <View style={styles.buttonRodape}>
            <AntDesign name="car" size={30} color="black" style={styles.icon} onPress={botaoCarro} />
          </View>
        </View>
      </View>
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
  diasAgendados:{
    //position:"absolute",
    //alignItems:"flex-start"
    marginTop:20,
    marginRight:260
  },
  texto:{
    //position:'static',
   // backgroundColor:'blue',
//    height:50,
    textAlign:"center",
    fontSize:30
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
  servisoRealizado:{
    position: "absolute",
    marginTop:"35%",
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