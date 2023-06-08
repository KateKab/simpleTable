<template>
    <h1>Sign In To Your Account</h1>
    <!-- <p><input type="text" placeholder="Fullname" v-model="name"></p> -->
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="text" placeholder="Password" v-model="password"></p>
    <p><button @click="register">Sign In</button></p>
</template>

<script>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            email: '',
            password: '',
            router: useRouter(),
            errMsg: '',
        }
    },
    methods: {
        register() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((data) => {
                    alert('Successfully logged in!');
                    this.router.push('/table')
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            this.errMsg = 'Invalid email'
                            break
                        case 'auth/user-not-found':
                            this.errMsg = 'No account with that email was found'
                            break
                        case 'auth/wrong-password':
                            this.errMsg = 'Incorrect password'
                            break
                        default:
                            this.errMsg = 'Email or password was incorrect'
                            break
                    }
                    alert(this.errMsg);
                });
        }
    }
}
</script>
