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
          <reply/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="padding: 10px;">
          <load-more-button :onClick="fetchPostsBlock"/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicList from '../components/BasicListPage'
  import Reply from '../components/Reply'
  import LoadMoreButton from '../components/LoadMoreButton'
  export default {
    components: {
      BasicList,
      Reply,
      LoadMoreButton,
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
        ],
        fetchOffset: 0,
        fetchNumPosts: 4,
      }
    },
    methods: {
      async fetchPostsBlock() {
        if(this.fetchOffset || this.fetchOffset === 0) {
          const posts = await this.$client.getTopics(
            this.id, 'posts',
            `order=oldest&max_n_results=${this.fetchNumPosts}&offset=${this.fetchOffset}`)
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
          if(posts.length === 0) {
            this.fetchOffset = null
          }
        }
      }
    },
    async created () {
      this.$client.getTopics(this.id)
        .then((topic) => {
            this.items[0] = { header: topic.title }
        })
      this.fetchPostsBlock()
    }
  }
</script>
<style>
  a {
    text-decoration: none;
    color: #ff8700 !important;
  }
</style>
