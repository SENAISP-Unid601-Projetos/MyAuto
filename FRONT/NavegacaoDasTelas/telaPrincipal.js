import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
//import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  //Chamando as telas de cadastro, login e notificação
  const botaoPerfil = () => {
    navigation.navigate("Perfil");
  };

  const botaoCarro = () => {
    navigation.navigate("CadastroCarroScreen");
  };

  const botaoNotificacao = () => {
    navigation.navigate("TelaDeNotificacao");
  };

  const botaoAgendar = () => {
    navigation.navigate("Agendamento");
  };

  const [agendamentosFuturos, setAgendamentosFuturos] = useState([]);
  const [error, setError] = useState(null);
  const [valorCookie, setValorCookie] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    setValorCookie(valorDoCookie);
    return valorDoCookie;
  };
  
  const fetchAgendamentos = useCallback(() => {
    setRefreshing(true);
    fetch("http://10.110.12.3:8080/api/agendamento")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao obter os agendamentos");
        }
      })
      .then((data) => {
        setAgendamentosFuturos(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Erro ao obter os agendamentos:", error);
        setError(error.message);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchAgendamentos();
  }, [fetchAgendamentos]);
  
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const valorCookie = await getCookie(); // Wait for getCookie to complete
        console.log("http://10.110.12.3:8080/api/agendamento/" + valorCookie);
        console.log('entrei');
        console.log(valorCookie);
        

        const response = await fetch("http://10.110.12.3:8080/api/agendamento/" + valorCookie);
        if (!response.ok) {
          throw new Error("Erro ao obter os agendamentos");
        }
  
        const data = await response.json();
        setAgendamentosFuturos(data);
      } catch (error) {
        console.error("Erro ao obter os agendamentos:", error);
        setError(error.message); // Define o erro no estado de erro
      }
    };
  
    fetchAgendamentos();
  }, []);
  

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        {/*Imagem da logo*/}
        <Image
          source={{
            uri: "https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true",
          }}
          style={styles.logo}
        />
      </View>

      {/* Foto de perfil e botão Perfil */}
      <View style={styles.profileContainer}>
        <View style={styles.botaoImagemLogin}>
          {/*Imagem de login*/}
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.buttonWithIcon}>
            <TouchableOpacity onPress={botaoPerfil} style={styles.botaologin}>
              <Text style={styles.ButtonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAgendamentos} />
        }
      >
      <View style={styles.servisoRealizado}>
        {error ? (
          <View>
            <Text>Ocorreu um erro ao carregar os serviços realizados.</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.texto}>Serviços Futuros</Text>

            <View style={styles.diasAgendados}>
              {agendamentosFuturos.map((agendamento, index) => (
                <Text style={styles.diaAgendado} key={index}>
                  {" "}
                  dia: {agendamento.data} - {agendamento.horario}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
      </ScrollView>

      {/* Retângulo roxo como rodapé */}
      <View style={styles.footerContainer}>
        {/* Botão Agendar */}
        {/* Restante dos botões */}
        <View style={styles.alinhaBotao}>
          <View style={styles.buttonRodape}>
            <AntDesign
              name="calendar"
              size={30}
              color="black"
              style={styles.icon}
              onPress={botaoAgendar}
            />
          </View>
          {/* Botão Notificações */}
          <View style={styles.buttonRodape}>
            <AntDesign
              name="bells"
              size={30}
              color="black"
              style={styles.icon}
              onPress={botaoNotificacao}
            />
          </View>
          {/* Botão Relatórios */}
          <View style={styles.buttonRodape}>
            <AntDesign
              name="car"
              size={30}
              color="black"
              style={styles.icon}
              onPress={botaoCarro}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  diasAgendados: {
    marginTop: "4%",
    width: "100%",
    marginRight: "50%",
  },
  diaAgendado: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fafba7",
    marginBottom: "2.5%",
  },
  diaAgendadoTexto: {
    fontSize: 18,
  },
  texto: {
    marginTop: '2%',
    textAlign: "center",
    fontSize: 30,
  },
  headerContainer: {
    backgroundColor: "#0A0226",
    padding: 10,
    width: "100%",
    alignItems: "center",
    position: "static",
  },
  logo: {
    marginTop: 13,
    width: 100,
    height: 100,
  },
  alinhaBotao: {
    flexDirection: "row",
  },
  profileContainer: {
    alignItems: "flex-start",
    position: "absolute",
    top: 36,
    right: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  servicoRealizado: {
    marginTop: 20,
    width: "90%",
  },
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonRodape: {
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 10,
    width: "34%",
  },
  icon: {
    margin: 10,
  },
  cadastroCarro: {
    position: "relative",
    backgroundColor: "black",
    borderRadius: 100,
  },
  botaologin: {
    backgroundColor: "#2196f3",
    alignItems: "center",
    borderRadius: 40,
    width: 70,
    height: 30,
    justifyContent: "center",
  },
  footerButton: {
    backgroundColor: "#2196f3",
    borderRadius: 2,
    width: 120,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  footerContainer: {
    backgroundColor: "black",
    width: "100%",
    alignItems: "center",
    position: "static",
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  botaoImagemLogin: {
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default HomeScreen;
