import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView, TextInput  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [valorCookie, setValorCookie] = useState('');
  const [trocaOleo, setTrocaOleo] = useState(false);
  const [outrosServicos, setOutrosServicos] = useState(false);
  const [descricaoServico, setDescricaoServico] = useState('');

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    console.log("esse ", valorDoCookie);
    setValorCookie(valorDoCookie);
    return valorDoCookie;
  };

  useEffect(() => {
    setValorCookie(getCookie());
  }, []);

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

  const agendarHorario = () => {
    if (!selectedDay || !selectedHour ) {
      Alert.alert('Erro', 'Preencha todos os campos antes de agendar');
      return;
    }

    const novoAgendamento = {
      data: selectedDay,
      horario: selectedHour,
      servico: selectedService,

      usuario : valorCookie
    };

    // Endpoint da API
    const endpoint = 'http://10.110.12.20:8080/api/agendamento';

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
        //console.log(valorCookie)
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
        body: `Seu agendamento está marcado para ${formatDate(selectedDay)} às ${selectedHour}`,
      },
      trigger: { date: notificationDate },
    });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
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
      
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.chooseDayContainer}>
        <View>
          <Text style={styles.chooseDayText}>Escolha o melhor dia:</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendario}
          onDayPress={handleDayPress}
          // Configuração para exibir as datas no formato dd/mm/aaaa
          dayFormat={'DD'}
          monthFormat={'MM'}
          yearFormat={'YYYY'}
        />
      </View>

      {selectedHour && (
        <View style={styles.selectedDateTimeContainer}>
          <Text style={styles.selectedDateTime}>
            {selectedDay && `Data: ${formatDate(selectedDay)}`}
            {selectedHour && `, Horário: ${selectedHour}`}
          </Text>
        </View>
      )}

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
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => setTrocaOleo(!trocaOleo)}
            >
              <Text>Troca de Óleo</Text>
              {trocaOleo && <Icon name="check" size={20} color="#41B06E" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => setOutrosServicos(!outrosServicos)}
            >
              <Text>Outros Serviços</Text>
              {outrosServicos && <Icon name="check" size={20} color="#41B06E" />}
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Descreva o problema ou serviço desejado"
            onChangeText={text => setDescricaoServico(text)}
            value={descricaoServico}
            multiline={true}
            numberOfLines={4}
          />

      <TouchableOpacity style={styles.button} onPress={agendarHorario}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '20%',
    backgroundColor: '#0A0226',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    marginTop: '-2%'
  },
  backButton: {
    marginLeft: -90,
    marginRight: 75,
    marginTop: '10%',
  },
  headerText: {
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: '10%'
  },
  chooseDayContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chooseDayText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 35,
    color: 'red',
    marginBottom: 30
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
    height: 80,
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
    top: '0%',
    right: '2%',
    zIndex: 1,
    padding: 2
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '5%',
    marginTop: 10,
    backgroundColor: '#fafba7',
    borderRadius: 15,
    padding: 20,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5%',
    width: "50%",
    marginEnd: '55%'
  },
  hourButton: {
    width: '65%',
    aspectRatio: 1,
    backgroundColor: '#0A0226',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: '3%'
  },
  hourText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    marginTop: '13%',
    backgroundColor: '#41B06E',
    borderRadius: 30,
    paddingVertical: '3%',
    paddingHorizontal: '20%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Agendamento;
