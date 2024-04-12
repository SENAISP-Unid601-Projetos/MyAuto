import React, { useState } from 'react';
import { View, Text, TextInput,Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Cadastro = ({navigation}) => {
  //Setando os metodos das informações do usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState(''); 
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [sexo, setSexo] = useState('');
  const [erro, setErro] = useState('');

  const botaologin=()=>{
    navigation.navigate('LoginScreen');
  }

  //Formatando a data de nacimento para o banco aceitar de forma normal
  const formatarDataDeNascimento = (dia, mes, ano) => {
    return `${ano}-${mes}-${dia}`;
  };

  const validarData = (dia, mes, ano) => {
    //Valida a data se a pessoa pasar o ano, mês e dia assim = dd/mm/aaaa
    const dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19\d{2}|20[01]\d|202[0-4])$/;
  
    if (dataRegex.test(`${dia}/${mes}/${ano}`)) {
      return 'Data de nascimento inválida.';
    } else {
      return '';
    }
  };
  
  
  //Cria o usuario no banco passando pelo Back End
  const Criar = () => {
    setErro('');

    if (!email || senha == 0) {
      setErro('Senha ou Email estão incorretos.');
      return;
    }

    //Regex sendo chamada
    validarData();

    if (erro) {
      return;
    }

    const formattedDate = formatarDataDeNascimento(dia,mes,ano);

    //setando os dados
    const dados = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "cpf": cpf,
      "dataDeNascimento": formattedDate,
      "sexo": sexo
    };

    //console.log(dados);

    

    fetch('http://10.110.12.3:8080/api/usuarios', { //metodo para chamar a API usando o feth
      method: 'POST', //Usamos o POST para postar no banco as informações

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao tentar criar usuário');
      }
      return response.json();
    })
    .then(dados => {
      botaologin();
      console.log('Usuário criado com sucesso:', dados);
    })
    .catch(error => {
      console.error('Ocorreu um erro ao tentar criar usuário:', error);
    });
    
  };

  return (
    //Tela para Colocar as informações do usuário
    <View style={styles.container}>
       <Text style={styles.label}>Digite o EMAIL:</Text>
      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Digite o NOME:</Text>
      <TextInput
        style={styles.input}
        placeholder="NOME"
        keyboardType="name-phone-pad"
        value={nome}
        onChangeText={setNome}
      />

       <Text style={styles.label}>Digite o CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={11}
        value={cpf}
        onChangeText={setCpf} 
      />
      {/*Botão para setar a data*/}
      <Text style={styles.label}>DATA DE NASCIMENTO:</Text>
      <View style={styles.dataNascimentoInput}>
        {/*Dia*/}
        <TextInput
          style={[styles.input, { width: '30%' }]}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={dia}
          onChangeText={setDia}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        {/*Mês*/}
        <TextInput
          style={[styles.input, { width: '30%' }]}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={mes}
          onChangeText={setMes}
        />
        <Text style={{ paddingHorizontal: 5 }}>/</Text>
        {/*Ano*/}
        <TextInput
          style={[styles.input, { width: '40%' }]}
          placeholder="AAAA"
          keyboardType="numeric"
          maxLength={4}
          value={ano}
          onChangeText={setAno}
        />
      </View>

        <Text style={styles.label}>QUAL É SEXO:</Text>
        {/*Lista para escolher o sexo da pessoa*/}
        <View style={styles.input}>
        <Picker
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
      >
        <Picker.Item label='Celecionar' value={(false)}/>
        <Picker.Item label="Homem" value="Homem"/>
        <Picker.Item label="Mulher" value="Mulher" />
        <Picker.Item label="Prefiro Não Opinar" value="Prefiro Não Opinar"/>
      </Picker>
      </View>


      <Text style={styles.label}>Digite a SENHA:</Text>
      <TextInput
      style={styles.input}
      placeholder='SENHA'
      value={senha}
      onChangeText={setSenha}
      secureTextEntry={true}
      />
      <Button title="Criar Conta" onPress={Criar} />

      {erro !== '' && <Text style={styles.error}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  dataNascimentoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Cadastro;