import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [valorCookie, setValorCookie] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  
  const botaoVoltar = () => {
    navigation.goBack();
  };

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    setValorCookie(valorDoCookie);
    return valorDoCookie;
  };

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);

      try {
        const valorCookie = await getCookie();
        const response = await fetch("http://10.110.12.3:8080/api/usuarios/" + valorCookie, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar os dados do usuário");
        }

        const dados = await response.json();
        console.log("dados retornados:", dados);
        setUserData(dados);
      } catch (error) {
        console.error("Ocorreu um erro ao carregar dados do perfil:", error);
      } finally {
        setRefreshing(false);
      }
    };

    fetchData();
  }, []);

  const ocultarCPF = (cpf) => {
    if (!cpf || cpf.length < 4) {
      return cpf;
    }
    return (
      cpf.substring(0, cpf.length - 2).replace(/\d/g, "*") +
      "-" +
      cpf.substring(cpf.length - 2)
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={35} color="white" onPress={() =>navigation.goBack()}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIcon}>
        <Ionicons name="person-circle" size={60} color="white" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
      >
      <View style={styles.profileContainer}>
        <Text style={styles.header}>Perfil</Text>
        {userData ? (
          <View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.textDados}>Dados Pessoais</Text>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>Nome:</Text>
                <Text style={styles.label}>{userData.nome}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>Email:</Text>
                <Text style={styles.label}>{userData.email}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>CPF:</Text>
                <Text style={styles.label}>{ocultarCPF(userData.cpf)}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>Data de Nascimento:</Text>
                <Text style={styles.label}>{userData.dataDeNascimento}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>Sexo:</Text>
                <Text style={styles.label}>{userData.sexo}</Text>
              </View>
              
            <Text style={styles.textDados}>Carros</Text>
            </View>

            {userData.carros.map((carro) => (
              <View key={carro.id} style={styles.carCard}>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Marca: 
                </Text>
                <Text style={styles.label}>{carro.marca}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Modelo: 
                </Text>
                <Text style={styles.label}>{carro.modelo}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Ano: 
                </Text>
                <Text style={styles.label}>{carro.ano}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Combustível:
                 
                </Text>
                <Text style={styles.label}>{carro.combustivel}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Câmbio:
                </Text>
                <Text style={styles.label}>{carro.cambio}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Placa: 
                </Text>
                <Text style={styles.label}>{carro.placa}</Text>
              </View>
              <View style={styles.inputStyles}>
                <Text style={styles.textInput}>
                  Uso:
                </Text>
                <Text style={styles.label}>{carro.uso}</Text>
              </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.loadingText}>Carregando...</Text>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0226",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    borderColor: "pink"
    //paddingHorizontal: 20,
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: "10%",
  },
  profileContainer: {
    alignItems: "center",
  },
  userInfoContainer: {
    backgroundColor: "#fff",
    //borderRadius: 10,
    padding: 20,
    width: 400,
    //height: 650,
    marginTop: "5%",
    alignItems: "center",
  },
  textDados: {
    fontSize: 28,
    fontWeight: "bold",
    alignItems: "center",
    //marginTop: "3%",
    //marginBottom: "8%",
    color: "red",
    fontStyle: "italic",
  },
  inputStyles: {
    backgroundColor: "#fafba7",
    borderRadius: 20,
    padding: "2%",
    width: "100%",
    marginBottom: "2%",
    borderWidth: 2,
    borderColor: "blue",
  },
  textInput: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: "2%",
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
    marginLeft: "5%",
  },
  backButton: {
    position: "absolute",
    top: "10%",
    left: 20,
  },
  profileIcon: {
    position: "absolute",
    top: "8%",
    right: 20,
  },
  logoutButton: {
    backgroundColor: "#c32b2b",
    paddingVertical: 10,
    width: "90%",
    borderRadius: 20,
    position: "abslute",
    bottom: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    height: 25,
    alignItems: "center",
    marginTop: 3,
  },
  carCard: {
    padding: 16,
    marginBottom: 45,
    backgroundColor: '#f8f8f8',
    //borderRadius: 8,
    //shadowColor: '#000',
    //shadowOpacity: 0.1,
    //shadowRadius: 10,
    //shadowOffset: { width: 0, height: 5 },
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default ProfileScreen;
