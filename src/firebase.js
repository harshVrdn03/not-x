import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyBsZWWHpIiw4QY2WkQWoSQ837SdwAcvNrw",
  authDomain: "blog-90c1f.firebaseapp.com",
  projectId: "blog-90c1f",
  storageBucket: "blog-90c1f.appspot.com",
  messagingSenderId: "687684594336",
  appId: "1:687684594336:web:e0e2dbfec00ffc563c37c5",
  measurementId: "G-4VNJCFZWN3",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export default async function handleFileUpload(file) {
  try {
    const imgref = ref(storage, `/images/${file.name + v4()}`);
    const uploadTask = await uploadBytes(imgref, file);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
  } catch (err) {
    console.error(err);
    return null;
  }
}
