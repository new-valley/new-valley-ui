<template>
  <v-app>
    <main-header/>
    <v-content>
      <router-view/>
    </v-content>
    <lateral-menu/>
  </v-app>
</template>

<script>
  import MainHeader from './components/MainHeader' 
  import LateralMenu from './components/LateralMenu'
  export default {
    components: {
      MainHeader,
      LateralMenu
    },
    name: 'App',
    data () {
      return {
        //
      }
    }
  }
</script>
