<template>
  <v-layout wrap style="height: 200px;">
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list class="pa-1">
        <v-list-tile v-if="$client.isLoggedIn()" avatar>
          <v-list-tile-avatar>
            <img src="loggedInUser.avatar.uri">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ loggedInUser.username }}</v-list-tile-title>
          </v-list-tile-content>
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
  export default {
    components: {
      Login
    },
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'home', 'to': '/' }
        ],
        loggedInUser: {
          username: '',
          avatar: {
            uri: ''
          }
        }
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
        this.loggedInUser = await this.$client.getMe()
        this.hideMenu()
      },
      redirectAndHideMenu(to) {
        console.log('to', to)
        this.$router.push(to)
        this.hideMenu()
      }
    },
    mounted() {
      this.$root.$on('login', this.postLoginAction)
      this.$root.$on('hide-lat-menu-btn-clicked', this.hideMenu)
      this.$root.$on('toggle-lat-menu-btn-clicked', this.toggleMenu)
    },
  }
</script>
