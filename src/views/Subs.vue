<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <basic-list :items="items"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="padding: 10px;">
          <new-topic v-if="$client.isLoggedIn()" :subforum_id="id"/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicList from '../components/BasicListPage'
  import NewTopic from '../components/NewTopic'
  export default {
    components: {
      BasicList,
      NewTopic
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        items: [
          { header: 'Tópicos' }
        ]
      }
    },
    async created () {
      this.$client.getSubForums(this.id)
        .then(resp => {
          this.$root.$emit(
            'sub-visited', resp.data.title, resp.data.subforum_id)
        })
      const threads = await this.$client.getSubForums(this.id, 'topics')
      threads.data.map((thread) => {
        const item = {
          avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
          title: thread.title,
          subtitle: thread.user.username,
          to: `/t/${thread.topic_id}`
        }
        const divider = { divider: true, inset: true }
        this.items.push(item, divider)
      })        
    }
  }
</script>
<style>
  a {
    text-decoration: none;
    color: #ff8700 !important;
  }
</style>
