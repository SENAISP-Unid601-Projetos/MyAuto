import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const CadastroCarroScreen = ({ navigation }) => {
  //Setando os metodos das informações do carro

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [km, setKm] = useState('');
  const [mediaKm, setMediaKm] = useState('');
  const [uso, setUso] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [cambio, setCambio] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [erro, setErro] = useState('');
  const [valorCookie, setValorCookie] = useState('');

  const [modalUsoVisible, setModalUsoVisible] = useState(false);
  const [modalFrequenciaVisible, setModalFrequenciaVisible] = useState(false);
  const [modalCambioVisible, setModalCambioVisible] = useState(false);
  const [modalCombustivelVisible, setModalCombustivelVisible] = useState(false);

  const [pickerOptionsUso, setPickerOptionsUso] = useState([
    { label: "Selecionar", value: null },
    { label: "Uber", value: "Uber" },
    { label: "Viagens", value: "Viagens" },
    { label: "Trabalho", value: "Trabalho" },
    { label: "Entregas", value: "Entregas" },
    { label: "Rural", value: "Rural" },
    { label: "Passeio", value: "Passeio" }
  ]);

  const [pickerOptionsFrequencia, setPickerOptionsFrequencia] = useState([
    { label: "Selecionar", value: null },
    { label: "Frequente", value: 1.5 },
    { label: "Razoável", value: 1 },
    { label: "Ocasional", value: 1.3 }
  ]);

  const [pickerOptionsCambio, setPickerOptionsCambio] = useState([
    { label: "Selecionar", value: null },
    { label: "Manual", value: "Manual" },
    { label: "Automático", value: "Automático" }
  ]);

  const [pickerOptionsCombustivel, setPickerOptionsCombustivel] = useState([
    { label: "Selecionar", value: null },
    { label: "Gasolina", value: "Gasolina" },
    { label: "Diesel", value: "Diesel" },
    { label: "Etanol", value: "Etanol" },
    { label: "Flex", value: "Flex" }
  ]);

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("id_usuario");
    console.log("esse ", valorDoCookie);
    setValorCookie(valorDoCookie);
    return valorDoCookie;
  };

  useEffect(() => {
    setValorCookie(getCookie());
  }, []);

  const calc = () => {
    return parseInt(10000 / mediaKm / frequencia);
  };

  const botaoVoltar = () => {
    navigation.goBack();
  };

  const formatarData = (ano) => {
    return `${ano}`;
  };

  //Criando o carro no banco pelo Back End
  const Criar = () => {
    //Mostra no console se a tela está pegando as informações
    console.log("Marca:", marca);
    console.log("Modelo:", modelo);
    console.log("Ano:", ano);
    console.log("KM:", km);

    setErro("");

    const formattedDate = formatarData(ano);
    const media = calc();

    //Dados do carro
    const dados = {
      "placa": "placa",
      "marca": marca,
      "modelo": modelo,
      "ano": formattedDate,
      "km": km,
      "mediaKm": mediaKm,
      "uso": uso,
      "cambio": cambio,
      "combustivel": combustivel,
      "calc":  media,
      "usuario": valorCookie
    };

    console.log(dados);

    fetch("http://10.110.12.3:8080/api/carros", {
      //metodo para chamar a API usando o feth
      method: "POST", //Usamos o POST para postar no banco as informações
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar seu carro");
        }
        return response.json();
      })
      .then((dados) => {
        console.log("Carro cadastrado com sucesso:", dados);
        Alert.alert(
          "Sucesso!",
          "Próxima troca de óleo em: " + calc() + " dias."
        );
        botaoVoltar();
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao cadastrar seu Carro:", error);
      });
  };

  return (
    //Tela para Colocar as informações do carro
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.botaoVoltar}>
        <TouchableOpacity style={styles.voltar}>
          <Icon name="arrow-left" size={24} color="white" onPress={botaoVoltar} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.Titulo}>
        <Text style={styles.FraseTitulo}>Cadastar Veículo:</Text>
      </View>
      <View style={styles.obcaoDeCelecao}>
        <Text style={styles.label}>Placa:</Text>
        <TextInput
          style={styles.input}
          value={placa}
          maxLength={7}
          onChangeText={setPlaca}
        />
        
        <Text style={styles.label}>Marca:</Text>
        <TextInput
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
        />
        <Text style={styles.label}>Modelo:</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
        />
        <Text style={styles.label}>Ano:</Text>
        <TextInput
          style={styles.input}
          maxLength={4}
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />
        <Text style={styles.label}>KM atual do veículo:</Text>
        <TextInput
          style={styles.input}
          value={km}
          maxLength={5}
          onChangeText={setKm}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Média de KM percorrido (diário):</Text>
        <TextInput
          style={styles.input}
          value={mediaKm}
          maxLength={6}
          onChangeText={setMediaKm}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Finalidade:</Text>
        <TouchableOpacity
          onPress={() => setModalUsoVisible(true)}
          style={styles.input}
        >
          <Text style={styles.pickerText}>{uso || "Selecionar"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUsoVisible}
          onRequestClose={() => {
            setModalUsoVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {pickerOptionsUso.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setUso(option.value);
                    setModalUsoVisible(false);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Frequência de uso:</Text>
        <TouchableOpacity
          onPress={() => setModalFrequenciaVisible(true)}
          style={styles.input}
        >
          <Text style={styles.pickerText}>{frequencia || "Selecionar"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFrequenciaVisible}
          onRequestClose={() => {
            setModalFrequenciaVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {pickerOptionsFrequencia.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFrequencia(option.value);
                    setModalFrequenciaVisible(false);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Câmbio:</Text>
        <TouchableOpacity
          onPress={() => setModalCambioVisible(true)}
          style={styles.input}
        >
          <Text style={styles.pickerText}>{cambio || "Selecionar"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCambioVisible}
          onRequestClose={() => {
            setModalCambioVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {pickerOptionsCambio.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCambio(option.value);
                    setModalCambioVisible(false);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Tipo de combustível:</Text>
        <TouchableOpacity
          onPress={() => setModalCombustivelVisible(true)}
          style={styles.input}
        >
          <Text style={styles.pickerText}>{combustivel || "Selecionar"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCombustivelVisible}
          onRequestClose={() => {
            setModalCombustivelVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {pickerOptionsCombustivel.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCombustivel(option.value);
                    setModalCombustivelVisible(false);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Pressable style={styles.btn} onPress={Criar}>
          <Text style={styles.texto}>Cadastrar</Text>
        </Pressable>
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  obcaoDeCelecao: {
    top: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0226",
    borderRadius: 60,
    marginHorizontal: 15,
    padding: "6%",
  },
  FraseTitulo: {
    color: "green",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "25%",
    marginTop: "8%",
    marginBottom: "5%",
  },
  voltar: {
    marginHorizontal: 10,
    top: 75,
    paddingHorizontal: 20,
  },
  botaoVoltar: {
    height: "15%",
    backgroundColor: "#0A0226",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: 11,
    backgroundColor: "#FFF9C4",
  },
  btncadastro: {
    flexDirection: "row",
    alignItems: "center",
    top: "5%",
  },
  btn: {
    backgroundColor: "#2196f3",
    color: "white",
    alignItems: "center",
    borderRadius: 20,
    width: "75%",
    height: 40,
    justifyContent: "center",
    marginTop: "5%"
    
  },
  texto: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto",
  },
  logo: {
    marginTop: "8%",
    width: 100, 
    height: 100, 
    margin: "37%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    
  },
  pickerText: {
    color: "#000",
    marginLeft: '35%',
    marginTop: '2.5%',
    fontSize: 18,
    padding: 2,
   

  },
  erro: {
    color: "red",
    marginTop: 16,
  },
});

export default CadastroCarroScreen;
