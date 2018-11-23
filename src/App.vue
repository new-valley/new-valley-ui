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
        //frequency of user update in milliseconds
        userUpdateFrequency: 60000
      }
    },
    created() {
      //updates user information periodically
      setInterval(() => {
        if(this.$client.isLoggedIn()) {
          this.$client.getMe()
            .then(user => {
              this.$session.setUser(user.data)
              console.log('updated user:', this.$session.getUser())
              this.$root.$emit('user-updated')
            })
        }
      }, this.userUpdateFrequency)
    }
  }
</script>
