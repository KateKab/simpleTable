import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAF68Y2TEHpuwNrrlQOGR86KXYH3dy3ac",
  authDomain: "vite-auth-ed4e9.firebaseapp.com",
  projectId: "vite-auth-ed4e9",
  storageBucket: "vite-auth-ed4e9.appspot.com",
  messagingSenderId: "86919799060",
  appId: "1:86919799060:web:f8b1ae7738caf12a652201",
  databaseURL:
    "https://vite-auth-ed4e9-default-rtdb.europe-west1.firebasedatabase.app/",
};

const fapp = initializeApp(firebaseConfig);
const db = getDatabase(fapp);

const app = createApp(App);

app.use(router);

app.mount("#app");
