import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Agendamento = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const botaoVoltar = () => {
    navigation.goBack();
  }

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setModalVisible(true);
  };

  const handleHourPress = (hour) => {
    setSelectedHour(hour);
  };

  const agendarHorario = () => {
    if (!selectedDay || !selectedHour) {
      Alert.alert('Erro', 'Selecione um dia e horário antes de agendar');
      return;
    }

    const novoAgendamento = {
      data: selectedDay,
      horario: selectedHour
    };

    // Endpoint da API
    const endpoint = 'http://10.110.12.3:8080/api/agendamento';

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoAgendamento),
    })
      .then(response => {
        if (response.ok) {
          // Agendamento bem-sucedido, agora agendar a notificação
          schedulePushNotification(selectedDay, selectedHour);
          Alert.alert('Sucesso', 'Agendamento realizado com sucesso.');
          setModalVisible(false);
        } else {
          throw new Error('Erro ao agendar');
        }
      })
      .catch(error => {
        console.error('Erro ao agendar:', error);
        Alert.alert(
          'Erro',
          'Erro ao agendar. Por favor, tente novamente mais tarde.'
        );
      });
  };

  const schedulePushNotification = (selectedDay, selectedHour) => {
    // Concatenando a data e hora selecionadas para formar um objeto Date
    const [year, month, day] = selectedDay.split('-').map(Number);
    const [hour, minute] = selectedHour.split(':').map(Number);
    const notificationDate = new Date(year, month - 1, day, hour, minute);

    // Agendando a notificação
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notificação Agendada',
        body: `Seu agendamento está marcado para ${selectedDay} às ${selectedHour}`,
      },
      trigger: { date: notificationDate },
    });
  };

  const renderAvailableHours = () => {
    // Horários disponíveis (pode ser substituído por uma chamada à API)
    const availableHours = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    return availableHours.map((hour, index) => (
      <TouchableOpacity key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }} onPress={() => handleHourPress(hour)}>
        <Text>{hour}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={botaoVoltar}>
          <Icon name="arrow-left" size={24} top={35} paddingHorizontal={20} color="white" />
        </TouchableOpacity>

      </View>
      <Calendar
        style={styles.calendario}
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
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Horários disponíveis para: {selectedDay}:</Text>
            {renderAvailableHours()}
            <TouchableOpacity style={styles.button} onPress={agendarHorario}>
              <Text style={styles.buttonText}>Agendar</Text>
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
    //marginTop: 22,
  },

  header: {
    height: '9%',
    backgroundColor: '#0A0226',
  },
  calendario: {
    top: 20
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Agendamento;
