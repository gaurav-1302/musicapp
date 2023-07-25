import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLlIFC-yluWVwQ-u3VrqvycxDCTManokc",
    authDomain: "atirun-musics.firebaseapp.com",
    databaseURL: "https://atirun-musics-default-rtdb.firebaseio.com",
    projectId: "atirun-musics",
    storageBucket: "atirun-musics.appspot.com",
    messagingSenderId: "352674689180",
    appId: "1:352674689180:web:73e70d056eae1a263fbd59"
};

const app = initializeApp(firebaseConfig);
export default getFirestore();