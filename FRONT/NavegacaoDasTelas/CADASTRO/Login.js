import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const botaoCadastrar = () => {
    navigation.navigate("Cadastro");
  };

  const [logarEmail, setLogarEmail] = useState("");
  const [logarSenha, setLogarSenha] = useState("");
  const [erro, setErro] = useState("");

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    return valorDoCookie;
  };

  const verificaLogado = async () => {
    try {
      const cookie = await getCookie();
      if (cookie) {
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.error("Erro ao verificar se está logado:", error);
    }
  };

  useEffect(() => {
    verificaLogado();
  }, []);

  const setCookie = async (id) => {
    try {
      await AsyncStorage.setItem("id_usuario", id);
      console.log("Cookie definido com sucesso " + id);
    } catch (error) {
      console.error("Erro ao definir o cookie:", error);
    }
  };

  const VerificarLogin = async () => {
    setErro("");

    if (!logarEmail || !logarSenha) {
      setErro("Senha ou Email estão incorretos.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.110.12.15:8080/api/usuarios/verificarDados",
        {
          email: logarEmail,
          senha: logarSenha,
        }
      );

      if (response.status === 200) {
        await setCookie(response.data.id + "");
        await AsyncStorage.setItem("userData", JSON.stringify(response.data)); // Armazenar os dados do usuário no AsyncStorage
        navigation.navigate("HomeScreen");
        console.log("Login Bem Sucedido!!");
        console.log("Email:", logarEmail);
        console.log("Senha:", logarSenha);
      } else {
        setErro("Senha ou Email estão incorretos.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao tentar logar:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar logar. Por favor, tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.loginContainer}>
        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLogarEmail(text)}
            value={logarEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLogarSenha(text)}
            value={logarSenha}
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={VerificarLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={botaoCadastrar}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://github.com/SSancaSH-Projetos/MyAuto/blob/main/MY%20AUT.png?raw=true",
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0020",
  },
  header: {
    fontSize: 36,
    color: "white",
    marginBottom: "25%",
  },
  loginContainer: {
    backgroundColor: "#FAFBA7",
    borderRadius: 30,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0020",
    borderRadius: 20,
    marginBottom: 16,
    width: "100%",
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    backgroundColor: "#0C3C84",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 8,
    width: "80%",
  },
  buttonSecondary: {
    backgroundColor: "#0C3C84",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});

export default LoginScreen;
