<template>
  <v-app>
    <main-header/>
    <v-content>
      <router-view/>
      <lateral-menu/>
    </v-content>
  </v-app>
</template>

<script>
  import MainHeader from './components/MainHeader' 
  import LateralMenu from './components/LateralMenu'
  export default {
    components: {
      LateralMenu,
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
