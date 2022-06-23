import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage'


const firebaseConfig = {
    
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const storage = getStorage(app);
  export const storageRef = ref(storage);
  export const imageRef = ref(storage,'images');