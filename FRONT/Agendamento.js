import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

import Icon from 'react-native-vector-icons/FontAwesome';

const Agendamento = () => {

  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setModalVisible(true);
  };

  const fechar = () => {
    setModalVisible(false);
  };


  const renderAvailableHours = () => {
    // Simulação de horários disponíveis (pode ser substituído por uma chamada à API)
    const availableHours = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00'
    ];

    return availableHours.map((hour, index) => (
      <TouchableOpacity key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Calendar
        onDayPress={handleDayPress}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


            <TouchableOpacity
            style={{...styles}}
            onPress={()=> fechar(true)}>
              <Icon name="share" size={30}/>

            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Horários disponíveis para: {selectedDay}:</Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Horários disponíveis para {selectedDay}:</Text>

            {renderAvailableHours()}
            
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(false),console.log("Dia Agendado: "+ selectedDay);
              }}
            >
              <Text style={styles.textStyle}>Agendar</Text>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }

});


export default Agendamento;

