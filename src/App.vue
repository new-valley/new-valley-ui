<template>
  <v-app>
    <main-header/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import MainHeader from './components/MainHeader' 
  export default {
    components: {
      MainHeader
    },
    name: 'App',
    data () {
      return {
        //
      }
    }
  }
</script>
