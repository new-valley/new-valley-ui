<template>
  <v-toolbar app dark color="orange accent-4">
    <v-toolbar-title flat v-if="$route.path === '/'" class="white--text">
      New Valley
    </v-toolbar-title>
    <v-btn flat v-if="$route.path != '/'" @click="goToBackLocation">
      <v-icon dark left>arrow_back</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn flat @click.stop="toggleLateralMenu()">
      <v-icon dark>menu</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
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
