import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCehIyQSX5zmzfjU29sBL0udd9YPeUr6uo",
  authDomain: "simpletablestorage.firebaseapp.com",
  databaseURL: "https://simpletablestorage-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simpletablestorage",
  storageBucket: "simpletablestorage.appspot.com",
  messagingSenderId: "115740631116",
  appId: "1:115740631116:web:19c6bd9d8733f98a1b94e9"
};


const fapp = initializeApp(firebaseConfig);
// const db = getDatabase(fapp);

const app = createApp(App);

app.use(router);

app.mount("#app");
