<template>
  <div class="modal-backdrop">
    <div class="modal">
      <label>Surname <input type="text" v-model="surname" /></label>
      <label>Firstname <input type="text" v-model="firstname" /></label>
      <label>Country <input type="text" v-model="country" /></label>
      <label>Category <input type="text" v-model="category" /></label>
      <label>Year <input type="text" v-model="year" /></label>
      <button
        @click="
          $emit(
            'addLaureate',
            this.surname,
            this.firstname,
            this.country,
            this.category,
            this.year
          )
        "
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["addLaureate"],
  data() {
    return {
      surname: "",
      firstname: "",
      country: "",
      category: "",
      year: "",
    };
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
</style>
