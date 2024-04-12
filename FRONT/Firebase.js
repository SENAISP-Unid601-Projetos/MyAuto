import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    // Sua configuração do Firebase aqui...
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
