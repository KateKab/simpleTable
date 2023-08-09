<template>
  <div>
    <button @click="previous" :disabled="currentPage == 0">prev</button>
    <label>{{ currentPage + 1 }}/{{ pages }}</label>
    <button @click="next" :disabled="currentPage == pages - 1">next</button>
  </div>
  <div>
    <button @click="addModal = true">Add</button>
    <add-item v-if="addModal" @addItem="addItem"></add-item>
  </div>
  <loader v-if="spinner"></loader>
  <table v-else id="tableComponent">
    <caption>
      Users Data
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
      <tr v-for="item in paginatedTable" :key="item">
        <td v-if="item" v-for="field in fields" :key="field">
          <!-- отображаем инпут если индекс кликнутого лауреата совпадает с текущим-->
          <input
            type="text"
            v-if="items.indexOf(item) == index"
            :value="item[field]"
            @keyup.enter="saveChange(index, field, $event)"
          />
          <template v-else>{{ item[field] }}</template>
        </td>
        <template v-if="item">
          <button @click="edit(item)">Edit</button>
          <button @click="remove(item)">Delete</button></template
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
import AddItem from "../components/AddItem.vue";

// const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const dbName = "users/";

export default {
  data() {
    return {
      items: [],
      searchQuery: "",
      fields: ["firstname", "lastname"],
      currentPage: 0,
      pageItems: 1000,
      asc: true,
      index: -1,
      spinner: false,
      addModal: false,
    };
  },
  components: {
    Loader,
    AddItem,
  },

  computed: {
    pages() {
      return Math.ceil(this.items.length / this.pageItems);
    },

    paginatedTable() {
      let start = this.currentPage * this.pageItems;
      let end = start + this.pageItems;
      return this.items.slice(start, end);
    },
  },

  methods: {
    edit(item) {
      this.index = this.items.indexOf(item);
    },

    saveChange(index, field, e) {
      var updates = {};

      updates[`/${dbName}${index}/${field}`] = e.target.value;

      update(ref(db), updates);
      // window.location.reload();
    },

    next() {
      this.currentPage++;
    },

    previous() {
      this.currentPage--;
    },

    sortTable(field) {
      if (this.asc) {
        this.items.sort((x, y) => (x[field] > y[field] ? -1 : 1));
        this.asc = false;
      } else {
        this.items.sort((x, y) => (x[field] < y[field] ? -1 : 1));
        this.asc = true;
      }
    },

    search() {
      this.spinner = true;
      const tableDataRef = ref(db, "${dbName}");

      onValue(tableDataRef, (snapshot) => {
        const tableData = snapshot.val();

        this.items = tableData;
        this.spinner = false;
      });

      let searchResult = [];
      this.items.forEach((item) => {
        if (item.firstname && item.surname) {
          if (
            item.firstname.toLowerCase().includes(this.searchQuery) ||
            item.surname.toLowerCase().includes(this.searchQuery)
          ) {
            searchResult.push(item);
          }
        }
      });
      this.items = [];
      this.items = searchResult;
    },

    remove(item) {
      const index = this.items.indexOf(item);

      remove(ref(db, `/${dbName}${index}/`));
    },

    addItem(lastname, firstname) {
      const index = Number(this.items.length);
      set(ref(db, `/${dbName}${index}/`), {
        lastname: lastname,
        firstname: firstname,
      });
      this.addModal = false;
    },
  },

  mounted() {
    this.spinner = true;
    const tableDataRef = ref(db, dbName);

    onValue(tableDataRef, (snapshot) => {
      const tableData = snapshot.val();
      this.items = tableData;
      console.log(tableData);
      this.spinner = false;
    });
  },
};
</script>
