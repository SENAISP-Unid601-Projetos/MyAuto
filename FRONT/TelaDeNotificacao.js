import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificacaoScreen = ({ closeModal }) => {
    
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Icon name="arrow-left" size={30}  />
      </TouchableOpacity>
      <Text style={styles.text}>Tela de Notificações</Text>
    </View>
    //<View style={styles.container}></View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'black',
        //borderWidth: 4,
        //padding: 10,
        marginBottom: 10,
      },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    position: 'absolute',
    right: 90,
    top: 20,
    fontSize: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default NotificacaoScreen;

