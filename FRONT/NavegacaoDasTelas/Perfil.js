import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const ocultarCPF = (cpf) => {
    return cpf.substring(0, cpf.length - 4).replace(/\d/g, '*') + cpf.substring(cpf.length - 4);
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
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIcon}>
        <Ionicons name="person-circle" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {/* <Image source={require('./profile-pic.jpg')} style={styles.profileImage} /> */}
        <Text style={styles.header}>Username</Text>
        {userData && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.label}>Nome: {userData.nome}</Text>
            <Text style={styles.label}>Email: {userData.email}</Text>
            <Text style={styles.label}>CPF: {ocultarCPF(userData.cpf)}</Text>
            <Text style={styles.label}>Data de Nascimento: {userData.dataDeNascimento}</Text>
            <Text style={styles.label}>Sexo: {userData.sexo}</Text>
            {/* Adicione mais campos conforme necessário */}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#c32b2b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
