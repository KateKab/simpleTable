<template>
    <h1>Feed</h1>
    <h3>This page is for users only</h3>
</template>
  
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            router: useRouter(),
        }
    },
    methods: {
        authListener() {
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert('you must be logged in to view this. redirecting to the home page')
                this.router.push('/')
            }
        })
    },
    
    beforeUnmount() {
        authListener()
    }
}
</script>
  