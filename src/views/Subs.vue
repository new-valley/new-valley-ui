<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <basic-list :items="items"/>
      </v-flex>
    </v-layout>
  </div>
  
</template>

<script>
  import BasicList from '../components/BasicListPage'
  export default {
    components: {
      BasicList
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
      const threads = await this.$client.getSubForums(this.id, 'topics')
      threads.map((thread) => {
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
