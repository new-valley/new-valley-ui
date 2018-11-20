<template>
  <v-toolbar app dark color="primary">
    <router-link to="/">
      <v-toolbar-title class="white--text">New Valley</v-toolbar-title>
    </router-link>
    <span v-if="subforumTitle">
      <router-link :to="subforumLink">
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{ subforumTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </router-link>
    </span>
    <span v-if="topicTitle">
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">{{ topicTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </span>
    <span v-if="displayLoginButton">
      <v-spacer></v-spacer>
      <login/>
      <v-spacer></v-spacer>
    </span>
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
        subforumTitle: '',
        subforumLink: '',
        topicTitle: '',
        displayLoginButton: true
      }
    },
    methods: {
      clearBreadcrumb() {
        this.topicTitle = ''
        this.subforumTitle = ''
        this.subforumLink = ''
      },
      setHomeBreadcrumb() {
        this.clearBreadcrumb()
      },
      setSubforumBreadcrumb(title, id) {
        this.clearBreadcrumb()
        this.subforumTitle = title
        this.subforumLink = `/s/${id}`
      },
      setTopicBreadcrumb(title, subforumTitle, subforumId) {
        this.clearBreadcrumb()
        this.topicTitle = title
        this.subforumTitle = subforumTitle
        this.subforumLink = `/s/${subforumId}`
      },
      disableLoginButton() {
        this.displayLoginButton = false
      }
    },
    mounted () {
      this.$root.$on('home-visited', this.setHomeBreadcrumb)
      this.$root.$on('sub-visited', this.setSubforumBreadcrumb)
      this.$root.$on('topic-visited', this.setTopicBreadcrumb)
      this.$root.$on('login', this.disableLoginButton)
    }
  }
</script>
