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
        userUpdateFrequency: 60000,
        daemons: [
        ]
      }
    },
    created() {
      //updates user information periodically
      this.daemons.push(setInterval(function(){
        if(this.$client.isLoggedIn()) {
          this.$client.getMe()
            .then(user => {
              this.$session.setUser(user.data)
              console.log('updated user:', this.$session.getUser())
              this.$root.$emit('user-updated')
            })
        }
      }.bind(this), this.userUpdateFrequency))
    },
    beforeDestroy() {
      for (let d of this.daemons) {
        clearInterval(d)
      }
    }
  }
</script>
