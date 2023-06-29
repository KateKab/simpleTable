<template>
  <div>
    <div>
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Search Laureate"
      />
      <button @click="search">Search</button>
    </div>
    <button @click="previous" :disabled="currentPage == 0">prev</button>
    <label>{{ currentPage + 1 }}/{{ pages }}</label>
    <button @click="next" :disabled="currentPage == pages - 1">next</button>
  </div>
  <div>
    <button @click="addModal = true">Add</button>
    <add-item v-if="addModal" @addLaureate="addLaureate"></add-item>
  </div>
  <loader v-if="spinner"></loader>
  <table v-else id="tableComponent">
    <caption>
      Nobel Prize Laureates
    </caption>
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th v-for="field in fields" :key="field" @click="sortTable(field)">
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through the list get the each laureate data -->
      <tr v-for="laureate in paginatedLaureates" :key="laureate">
        <td v-if="laureate" v-for="field in fields" :key="field">
          <!-- отображаем инпут если индекс кликнутого лауреата совпадает с текущим-->
          <input
            type="text"
            v-if="laureates.indexOf(laureate) == index"
            :value="getValue(laureate, field)"
            @keyup.enter="saveChange(index, field, $event)"
          />
          <template v-else>{{ getValue(laureate, field) }}</template>
        </td>
        <template v-if="laureate">
          <button @click="edit(laureate)">Edit</button>
          <button @click="remove(laureate)">Delete</button></template
        >
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  set,
} from "firebase/database";
import Loader from "../components/Loader.vue";
import AddItem from "../components/addItem.vue";

const auth = getAuth();
const router = useRouter();
const db = getDatabase();

export default {
  data() {
    return {
      laureates: [],
      searchQuery: "",
      fields: ["surname", "firstname", "bornCountryCode", "category", "year"],
      currentPage: 0,
      pageItems: 1000,
      asc: true,
      index: -1,
      spinner: false,
      addModal: false,
      lala: [],
    };
  },
  components: {
    Loader,
    AddItem,
  },

  computed: {
    pages() {
      return Math.ceil(this.laureates.length / this.pageItems);
    },
    paginatedLaureates() {
      let start = this.currentPage * this.pageItems;
      let end = start + this.pageItems;
      return this.laureates.slice(start, end);
    },
  },

  methods: {
    getValue(laureate, field) {
      if (field == "year" || field == "category") {
        return laureate.prizes[0][field];
      } else return laureate[field];
    },
    edit(laureate) {
      this.index = this.laureates.indexOf(laureate);
    },
    next() {
      this.currentPage++;
    },
    previous() {
      this.currentPage--;
    },
    sortTable(field) {
      if (this.asc) {
        this.laureates.sort((x, y) => (x[field] > y[field] ? -1 : 1));
        this.asc = false;
      } else {
        this.laureates.sort((x, y) => (x[field] < y[field] ? -1 : 1));
        this.asc = true;
      }
    },
    search() {
      this.spinner = true;
      const laureatesRef = ref(db, "laureates/");
      onValue(laureatesRef, (snapshot) => {
        const laureateData = snapshot.val();
        console.log(typeof this.laureates);
        this.laureates = laureateData;
        this.spinner = false;
      });

      let searchResult = [];
      this.laureates.forEach((laureate) => {
        if (laureate.firstname && laureate.surname) {
          if (
            laureate.firstname.toLowerCase().includes(this.searchQuery) ||
            laureate.surname.toLowerCase().includes(this.searchQuery)
          ) {
            searchResult.push(laureate);
          }
        }
      });
      this.laureates = [];
      this.laureates = searchResult;
    },
    saveChange(index, field, e) {
      var updates = {};

      if (field === "year" || field === "category") {
        updates[`/laureates/${index}/prizes/0/${field}`] = e.target.value;
      } else updates[`/laureates/${index}/${field}`] = e.target.value;

      update(ref(db), updates);
      // window.location.reload();
    },
    remove(laureate) {
      const index = this.laureates.indexOf(laureate);

      remove(ref(db, `/laureates/${index}/`));
    },

    addLaureate(surname, firstname, country, category, year) {
      const index = Number(this.laureates.length);
      set(ref(db, `/laureates/${index}/`), {
        surname: surname,
        firstname: firstname,
        bornCountryCode: country,
      });
      set(ref(db, `/laureates/${index}/prizes/0/`), {
        category: category,
        year: year,
      });
      this.addModal = false;
    },
  },

  mounted() {
    this.spinner = true;
    const laureatesRef = ref(db, "laureates/");

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert(
          "you must be logged in to view this. redirecting to the home page"
        );
        router.push("/");
      }
    });

    onValue(laureatesRef, (snapshot) => {
      const laureateData = snapshot.val();
      console.log(typeof this.laureates);
      this.laureates = laureateData;
      this.spinner = false;
    });
  },
};
</script>
