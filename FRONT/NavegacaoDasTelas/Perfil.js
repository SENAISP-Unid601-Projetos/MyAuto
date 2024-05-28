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
    return cpf.substring(0, cpf.length - 2).replace(/\d/g, '*') +" - " + cpf.substring(cpf.length - 2);
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
        <Ionicons name="person-circle" size={70} color="white" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {/* <Image source={require('./profile-pic.jpg')} style={styles.profileImage} /> */}
        <Text style={styles.header}>Perfil</Text>
        {userData && (
          <View style={styles.userInfoContainer}> 
           <Text style={styles.labelDados}>Dados Pessoais</Text>

            <View style={styles.EstiloNome}>
            <Text style={styles.label}>Nome:   {userData.nome}</Text>
            </View>

            <View style={styles.EstiloNome}>
            <Text style={styles.label}>Email:   {userData.email}</Text>
            </View>

            <View style={styles.EstiloNome}>
            <Text style={styles.label}>CPF:   {ocultarCPF(userData.cpf)}</Text>
            </View>

            <View style={styles.EstiloNome}>
            <Text style={styles.label}>Data de Nascimento:   {userData.dataDeNascimento}</Text>
            </View>

            <View style={styles.EstiloNome}>
            <Text style={styles.label}>Sexo:   {userData.sexo}</Text>
            </View>
            {/* Adicione mais campos conforme necessário */}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Encerrar sessão</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    top: "7%"
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

  EstiloNome:{
    backgroundColor: '#FAFBA7',
    pading: 1,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    marginBottom: '3%',
    top: '10%',
    marginTop: '3%',
    padding: '2%',
    

  },

  userInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 400,
    height: '85%',
    alignItems: 'center',
    top: '10%'
  },

  label: {
    fontSize: 20,
    color: 'black',
    alignItems: 'center',
   
  },

  labelDados: {
    fontSize: 28,
    fontStyle: 'italic',
    marginTop:'10%',

  },

  backButton: {
    position: 'absolute',
    top: "8%",
    left: 20,
  },

  profileIcon: {
    position: 'absolute',
    top: '9%',
    right: 15,
    
  },

  logoutButton: {
    backgroundColor: '#c32b2b',
    paddingVertical: 10,
    paddingHorizontal: '33%',
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    right: 20,
    marginBottom: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
