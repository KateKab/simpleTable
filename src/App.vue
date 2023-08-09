<template>
  <div>
    <nav>
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Sign-In </router-link> |
      <router-link  to="/table"> Table
        <!-- <span v-if="isLoggedIn">
          <button @click="signOut">Logout</button>
        </span> -->
      </router-link>
    </nav>
  </div>
  <router-view />
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      isLoggedIn: true, // пользователь всегда авторизован
      router: useRouter(),
    }
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.router.push('./')
      })
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true // if we have a user
      } else {
        this.isLoggedIn = false // if we do not
      }
    })
  }
}
</script>

