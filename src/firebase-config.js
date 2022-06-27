import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDdg1FDDiD-N-GqdO9swFCcnay9WVgzfbI",
    authDomain: "fir-gallery-8853e.firebaseapp.com",
    projectId: "fir-gallery-8853e",
    storageBucket: "fir-gallery-8853e.appspot.com",
    messagingSenderId: "1093436817220",
    appId: "1:1093436817220:web:0e26f3d723923862ffe111"
  };
  

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const storage = getStorage(app);
  export const storageRef = ref(storage);
  export const imageRef = ref(storage,'images');