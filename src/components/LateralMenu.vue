<template>
  <v-layout wrap style="height: 200px;">
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list class="pa-1">
        <v-list-tile v-if="$client.isLoggedIn()" avatar>
          <v-list-tile-avatar>
            <img src="user.avatar.uri">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.username }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$client.isLoggedIn()" avatar>
          <logout/>
        </v-list-tile>
        <v-list-tile v-if="!$client.isLoggedIn()" avatar>
          <login/>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" @click="redirectAndHideMenu(item.to)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
  import Login from './Login'
  import Logout from './Logout'
  export default {
    components: {
      Login,
      Logout
    },
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'home', 'to': '/' }
        ],
      }
    },
    methods: {
      toggleMenu() {
        this.drawer = !this.drawer
      },
      hideMenu() {
        this.drawer = false
      },
      async postLoginAction() {
        this.hideMenu()
      },
      async postLogoutAction() {
        this.hideMenu()
      },
      redirectAndHideMenu(to) {
        this.$router.push(to)
        this.hideMenu()
      }
    },
    mounted() {
      this.$root.$on('logout', this.postLogoutAction)
      this.$root.$on('login', this.postLoginAction)
      this.$root.$on('hide-lat-menu-btn-clicked', this.hideMenu)
      this.$root.$on('toggle-lat-menu-btn-clicked', this.toggleMenu)
    },
    computed: {
      user() {
        return this.$session.getUser()
      }
    }
  }
</script>
