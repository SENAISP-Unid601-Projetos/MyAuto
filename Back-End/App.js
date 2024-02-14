import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as  Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const handleCallNotifications = async ()=>{
    const {status} = await Notifications.getPermissionsAsync();

    if (status !== 'granted'){
      Alert.alert("Voce bla bla ");

      return;
    }
    console.log("Notificações");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <button title="Chamar notificacao " 
      style={styles.button} 
      onPress={handleCallNotifications}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",


  },
});