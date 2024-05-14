import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TelaDeNotificacao = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('realizados');
  const [agendamentosFuturos, setAgendamentosFuturos] = useState([]);
  const [error, setError] = useState(null);

  const botaoVoltar = () => {
    navigation.goBack();
  }

  fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Faça algo com os dados recebidos
  })
  .catch(error => {
    console.error('Houve um problema ao buscar os dados:', error);
  });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={botaoVoltar}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'realizados' && styles.selectedTab]}
          onPress={() => setSelectedTab('realizados')}
        >
          <Text style={styles.tabText}>Serviços Realizados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'futuros' && styles.selectedTab]}
          onPress={() => setSelectedTab('futuros')}
        >
          <Text style={styles.tabText}>Serviços Futuros</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo da Tab selecionada */}
      {error ? ( // Renderiza o erro se ocorrer
        <View>
          <Text>Erro ao carregar os agendamentos: {error}</Text>
        </View>
      ) : selectedTab === 'realizados' ? (
        <View>
          <Text>Conteúdo dos Serviços Realizados</Text>
        </View>
      ) : (
        <View>
          <Text>Conteúdo dos Serviços Futuros</Text>
          {agendamentosFuturos.map((agendamento, index) => (
            <Text key={index}>{agendamento.data} - {agendamento.horario}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    top: 25
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
  },
});

export default TelaDeNotificacao;
