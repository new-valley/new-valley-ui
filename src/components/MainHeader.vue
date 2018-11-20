<template>
  <v-toolbar app dark color="primary">
    <v-btn flat v-if="$route.path != '/'" @click="goToBackLocation">
      <v-icon dark left>arrow_back</v-icon>back
    </v-btn>
    <v-toolbar-title flat v-if="$route.path === '/'" class="white--text">
      New Valley
    </v-toolbar-title>
    <v-flex xs3></v-flex>
    <v-btn flat @click.stop="toggleLateralMenu()">menu</v-btn>
  </v-toolbar>
</template>

<script>
  import Login from './Login'
  export default {
    components: {
      Login
    },
    data () {
      return {
        topicBackLocation: ''
      }
    },
    methods: {
      setTopicBackLocation(subforum) {
        this.topicBackLocation = `/s/${subforum.subforum_id}`
      },
      getBackLocation() {
        if(this.$route.name === 's') {
          return '/'
        } else if(this.$route.name === 't') {
          return this.topicBackLocation
        } else {
          return '/'
        }
      },
      goToBackLocation() {
        this.$router.push(this.getBackLocation())
      },
      toggleLateralMenu() {
        this.$root.$emit('toggle-lat-menu-btn-clicked')
      }
    },
    mounted() {
      this.$root.$on('topic-visited', this.setTopicBackLocation)
    }
  }
</script>
