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

  useEffect(() => {
    fetch('http://10.110.12.31:8080/api/agendamento')
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
  }, []);

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
