import React, { useEffect } from 'react';
import {  StyleSheet, Animated, Easing } from 'react-native';

const Abertura = ({ navigation }) => {
  const rotateYValue = new Animated.Value(0);
  const backgroundColorValue = new Animated.Value(0);

  useEffect(() => {
    // Animação para girar o logo
    Animated.timing(
      rotateYValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();

    // Animação para mudar a cor de fundo
    Animated.timing(
      backgroundColorValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false, // A animação de cor de fundo não suporta o driver nativo
      }
    ).start(() => {
      navigation.replace('HomeScreen'); // Navega para a tela principal após 3 segundos
    });
  }, [navigation, rotateYValue, backgroundColorValue]);

  const rotateY = rotateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColor = backgroundColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0A0226', '#1E0342'], // Cor inicial e cor final
  })

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Image
        source={{ uri: 'https://github.com/SSancaSH-Projetos/MyAuto/blob/new-Tela_Carro/FRONT/MyautoOficina/img/MY%20AUT.png?raw=true' }}
        style={[styles.logo, { transform: [{ rotateY }] }]}
      />
    </Animated.View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 200, // Metade da largura ou altura para torná-lo redondo
  },
});

export default Abertura;
