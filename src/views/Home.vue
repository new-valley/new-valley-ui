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
          <login three-line/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicList from '../components/BasicListPage'
  import Login from '../components/Login'
  export default {
    components: {
      BasicList,
      Login
    },
    async created () {
      const subs = await this.$client.getSubForums()
      subs.map((sub) => {
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
