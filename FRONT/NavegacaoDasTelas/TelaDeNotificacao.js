import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const TelaDeNotificacao = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("realizados");
  const [isLoading, setIsLoading] = useState(true);
  const [agendamentosFuturos, setAgendamentosFuturos] = useState([]);
  const [error, setError] = useState(null);

  const botaoVoltar = () => {
    navigation.goBack();
  };

  //  const visualizarServico = () => {

  //  }

  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(
        "http://10.110.12.15:8080/api/agendamento"
      );
      console.log(response.data);
      setAgendamentosFuturos(response.data); // Aqui, use `response.data` para acessar os dados reais
    } catch (error) {
      console.error("Erro ao obter os agendamentos:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
    //console.log(agendamentosFuturos)
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={botaoVoltar}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "realizados" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("realizados")}
          >
            <Text style={styles.tabText}>Serviços Realizados</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo da Tab de Serviços Realizados */}
        {error ? ( // Renderiza o erro se ocorrer
          <View>
            <Text>Erro ao carregar os agendamentos: {error}</Text>
          </View>
        ) : (
          <View style={styles.realizadosContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Serviços Realizados</Text>
            </View>
            {!isLoading &&
              agendamentosFuturos.map((agendamento, index) => (
                <View key={index} style={styles.agendamentoContainer}>
                  <Image
                    source={agendamento.imagem}
                    style={styles.imagemOficina}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.nomeOficina}>
                      {agendamento.nomeOficina}
                    </Text>
                    <Text>Tipo de Serviço: {agendamento.tipoServico}</Text>
                    <Text>Data: {agendamento.data}</Text>
                    <Text>Hora: {agendamento.horario}</Text>
                    <Text>Local: {agendamento.local}</Text>
                    <TouchableOpacity
                      //onPress={visualizarServico}
                      style={styles.visualizarButton}
                    >
                      <Text style={styles.buttonText}>Visualizar Serviço</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>{/* Rodapé aqui */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 25,
    flex: 1, // Faz com que o título ocupe o máximo de espaço possível
    textAlign: "center", // Centraliza o texto
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  titleContainer: {
    backgroundColor: "#F0E68C",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 20,
  },
  titleText: {
    color: "black",
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 40,
    top: 25,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedTab: {
    borderBottomColor: "black",
  },
  tabText: {
    fontSize: 16,
  },
  agendamentoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imagemOficina: {
    width: "35%",
    height: "80%",
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  visualizarButton: {
    backgroundColor: "#1E90FF", // Azul escuro
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
  },
  buttonText: {
    color: "white", // Branco
    fontSize: 15, // Tamanho da fonte aumentado
    textAlign: "center",
  },
  nomeOficina: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default TelaDeNotificacao;
