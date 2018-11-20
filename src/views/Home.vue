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
    async created () {
      this.$root.$emit('home-visited')
      const subs = await this.$client.getSubForums()
      subs.data.map((sub) => {
        const item = {
          avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
          title: sub.title,
          subtitle: sub.description,
          to: `/s/${sub.subforum_id}`
        }
        const divider = { divider: true, inset: true }
        this.items.push(item, divider)
      })
    },
    data () {
      return {
        items: [
          { header: 'Subforums' }
        ]
      }
    }
  }
</script>
<style>
  a {
    text-decoration: none;
    color: #ff8700 !important;
  }
</style>
