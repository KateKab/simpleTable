<template>
    <h1>Create an Account</h1>
    <!-- <p><input type="text" placeholder="Fullname" v-model="name"></p> -->
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="text" placeholder="Password" v-model="password"></p>
    <p><button @click="register">Register</button></p>
</template>

<script>
// import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            email: '',
            password: '',
            router: useRouter(),
        }
    },
    methods: {
        register() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    alert('Successfully registered!');
                    this.router.push('/table')
                })
                .catch(error => {
                    console.log(error.code)
                    alert(error.message);
                });
        }
    }
}
</script>
