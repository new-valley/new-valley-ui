<template>
  <v-layout wrap style="height: 200px;">
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list class="pa-1">
        <user-card
          v-if="$client.isLoggedIn()"
          :username=user.username
          :nPosts=user.n_posts
          :nTopics=user.n_topics
          :avatarUri=user.avatar.uri
          :createdAt=user.created_at
          />
        <v-list-tile v-if="!$client.isLoggedIn()">
          <login/>
        </v-list-tile>
        <v-list-tile v-if="$client.isLoggedIn()">
          <v-layout row justify-center>
            <v-flex xs6><logout/></v-flex>
            <v-flex xs6><update-user/></v-flex>
          </v-layout>
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
  import UpdateUser from './UpdateUser'
  import UserCard from './UserCard'
  export default {
    components: {
      UpdateUser,
      UserCard,
      Login,
      Logout
    },
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'home', 'to': '/' }
        ],
        user: {username: 'user', avatar: {'uri': 'http://example.com/img.jpg'}}
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
      },
      updateUser() {
        this.user = this.$session.getUser()
      }
    },
    mounted() {
      this.updateUser()
      this.$root.$on('logout', this.postLogoutAction)
      this.$root.$on('login', this.postLoginAction)
      this.$root.$on('hide-lat-menu-btn-clicked', this.hideMenu)
      this.$root.$on('toggle-lat-menu-btn-clicked', this.toggleMenu)
      this.$root.$on('user-updated', this.updateUser)
    }
  }
</script>
