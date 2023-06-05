import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAF68Y2TEHpuwNrrlQOGR86KXYH3dy3ac",
  authDomain: "vite-auth-ed4e9.firebaseapp.com",
  projectId: "vite-auth-ed4e9",
  storageBucket: "vite-auth-ed4e9.appspot.com",
  messagingSenderId: "86919799060",
  appId: "1:86919799060:web:f8b1ae7738caf12a652201",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
