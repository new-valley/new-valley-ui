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
            { header: 'topic' }
        ]
      }
    },
    async created () {
      this.$client.getTopics(this.id)
        .then((topic) => {
            this.items[0] = { header: topic.title };
        })
      const posts = await this.$client.getTopics(this.id, 'posts')
      posts.map((post) => {
        const item = {
          avatar: post.user.avatar.uri,
          title: post.user.username,
          subtitle: post.content,
          to: `/p/${post.post_id}`
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
