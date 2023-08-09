<template>
  <div class="modal-backdrop">
    <div class="modal">
      <label>Lastname <input type="text" v-model="lastname" /></label>
      <label>Firstname <input type="text" v-model="firstname" /></label>
      <button @click="$emit('addItem', this.lastname, this.firstname)">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["addItem"],
  data() {
    return {
      lastname: "",
      firstname: "",
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
