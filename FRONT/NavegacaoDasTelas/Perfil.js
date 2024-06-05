import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          console.log("User Data:", JSON.parse(data)); // Registrar dados para verificar seu conteúdo
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const ocultarCPF = (cpf) => {
    if (!cpf || cpf.length < 4) {
      return cpf;
    }
    return cpf.substring(0, cpf.length - 2).replace(/\d/g, '*') + '-' + cpf.substring(cpf.length - 2);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIcon}>
        <Ionicons name="person-circle" size={60} color="white" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Text style={styles.header}>Perfil</Text>
        {userData ? (
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
          </View>
        ) : (
          <Text style={styles.loadingText}>Carregando...</Text>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0226',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: '10%',
  },
  profileContainer: {
    alignItems: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 400,
    height: 650,
    marginTop: '5%',
    alignItems: 'center',
  },
  textDados: {
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '8%',
    color: 'red',
    fontStyle: 'italic',
  },
  inputStyles: {
    backgroundColor: '#fafba7',
    borderRadius: 20,
    padding: '2%',
    width: '100%',
    marginBottom: '2%',
    borderWidth: 2,
    borderColor: 'blue',
  },
  textInput: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: '2%',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    marginLeft: '5%',
  },
  backButton: {
    position: 'absolute',
    top: '10%',
    left: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: '8%',
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#c32b2b',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    height: 25,
    alignItems: 'center',
    marginTop: 3,
  },
  loadingText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
});

export default ProfileScreen;
