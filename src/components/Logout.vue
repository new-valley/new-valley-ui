<template>
  <v-layout row justify-center>
      <v-btn slot="activator" @click="logout()" dark>Logout</v-btn>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      logout() {
          this.$client.logout()
          this.$root.$emit('logout')
          alert('user logged out')
        }
      }
    }
</script>
