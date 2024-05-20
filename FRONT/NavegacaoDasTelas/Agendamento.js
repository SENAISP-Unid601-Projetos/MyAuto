import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert, TextInput } from 'react-native';
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
  const [selectedService, setSelectedService] = useState('');

  const botaoVoltar = () => {
    navigation.goBack();
  }

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setModalVisible(true);
  };

  const handleHourPress = (hour) => {
    setSelectedHour(hour);
    setModalVisible(false); // Esconde a modal ao selecionar um horário
  };

  // const handleServiceChange = (text) => {
  //   setSelectedService(text);
  // };

  const agendarHorario = () => {
    if (!selectedDay || !selectedHour ) {
      Alert.alert('Erro', 'Preencha todos os campos antes de agendar');
      return;
    }

    const novoAgendamento = {
      data: selectedDay,
      horario: selectedHour,
      servico: selectedService
    };

    // Endpoint da API
    const endpoint = 'http://10.110.12.28:8080/api/agendamento';

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

  const availableHours = [
    ['09:00', '10:00', '11:00'],
    ['12:00', '13:00', '14:00'],
    ['15:00', '16:00', '17:00']
  ];

  const renderAvailableHours = () => {
    return (
      availableHours.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((hour, colIndex) => (
            <TouchableOpacity key={`${rowIndex}-${colIndex}`} style={styles.hourButton} onPress={() => handleHourPress(hour)}>
              <Text style={styles.hourText}>{hour}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={botaoVoltar} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agendamento</Text>
      </View>

      <View style={styles.chooseDayContainer}>
        <View>
          <Text style={styles.chooseDayText}>Escolha o melhor dia:</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendario}
          onDayPress={handleDayPress}
          // Modificações para alterar a ordem da data para dia, mês e ano
          dayFormat={'D'}
          monthFormat={'M'}
          yearFormat={'YYYY'}
        />
      </View>

      {selectedHour && (
        <View style={styles.selectedDateTimeContainer}>
          <Text style={styles.selectedDateTime}>
            {selectedDay && `Data: ${selectedDay}`}
            {selectedHour && `, Horário: ${selectedHour}`}
          </Text>
        </View>
      )}

      {/* Texto orientativo sobre o input */}
      {/* <Text style={styles.inputLabel}>Descreva o objetivo do Agendamento: (Revisão, troca de Óleo... )</Text>

     
      <TextInput
        style={styles.input}
        placeholder="EX: O CARRO ESTÁ FALHANDO."
        onChangeText={handleServiceChange}
        value={selectedService}
      /> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Horários disponíveis para: {selectedDay}:</Text>
            {renderAvailableHours()}
          </View>
        </View>
      </Modal>

      {/* Botão Agendar */}
      <TouchableOpacity style={styles.button} onPress={agendarHorario}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background branco
  },
  header: {
    height: '10%',
    backgroundColor: '#0A0226',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row', // Para alinhar o texto e o botão na mesma linha
  },
  backButton: {
    marginRight: 10, // Adicionando margem à direita para separar o botão do texto
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chooseDayContainer: {
    alignItems: 'center',
    marginTop: 20, // Aumentando a margem superior
  },
  chooseDayText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  calendarContainer: {
    marginVertical: '5%',
    width: '90%',
    alignSelf: 'center',
  },
  selectedDateTimeContainer: {
    backgroundColor: '#001F3D',
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 10,
  },
  selectedDateTime: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  calendario: {
    width: '100%',
  },
  inputLabel: {
    marginHorizontal: 12,
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: '2%',
    right: '2%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Alterado de 'space-between' para 'space-around'
    alignItems: 'center',
    marginBottom: '5%',
  },
  hourButton: {
    width: '65%', // Ajuste de tamanho para acomodar os botões em uma fila
    aspectRatio: 1, // Mantém a proporção 1:1 para os botões
    backgroundColor: '#0A0226',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight:'3%'
  },
  hourText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    marginTop: '5%',
    backgroundColor: '#41B06E', // Cor verde
    borderRadius: 30, // Aumentando a borda para deixar o botão mais arredondado
    paddingVertical: '5%', // Aumentando o padding vertical para deixar o botão maior
    paddingHorizontal: '15%', // Aumentando o padding horizontal para deixar o botão maior
    alignSelf: 'center', // Para alinhar o botão ao centro
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Agendamento;
