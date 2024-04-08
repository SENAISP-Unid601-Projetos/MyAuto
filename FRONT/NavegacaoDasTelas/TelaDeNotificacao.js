import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TelaDeNotificacao = ({ closeModal }) => {
  const [selectedTab, setSelectedTab] = useState('realizados');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={closeModal}>
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
      {selectedTab === 'realizados' ? (
        <View>
          <Text>Conteúdo dos Serviços Realizados</Text>
        </View>
      ) : (
        <View>
          <Text>Conteúdo dos Serviços Futuros</Text>
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
    top: 0,
    left: 0,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
