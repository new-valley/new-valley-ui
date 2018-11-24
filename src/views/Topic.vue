<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <post-list-item v-for="item in items" :key="item.post_id"
          :message="item.message"
        />
        <v-layout row>
          <v-flex xs6 sm6>
            <v-card style="padding: 10px;">
              <reply v-if="$client.isLoggedIn()" :topic_id="id"/>
            </v-card>
          </v-flex>
          <v-flex xs6 sm6>
            <v-card style="padding: 10px;">
              <load-more-button :onClick="fetchPostsBlock"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import PostListItem from '../components/PostListItem'
  import BasicList from '../components/BasicListPage'
  import Reply from '../components/Reply'
  import LoadMoreButton from '../components/LoadMoreButton'
  export default {
    components: {
      PostListItem,
      BasicList,
      Reply,
      LoadMoreButton
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
        fetchNumPosts: 20,
      }
    },
    methods: {
      async fetchPostsBlock() {
        if(this.fetchOffset || this.fetchOffset === 0) {
          const posts = await this.$client.getTopics(
            this.id, 'posts',
            `order=oldest&max_n_results=${this.fetchNumPosts}&offset=${this.fetchOffset}`)
          posts.data.map(post => {
            console.log('post:', post)
            const item = {
              message: post
            }
            this.items.push(item)
          })
          this.fetchOffset = posts.offset
        }
      }
    },
    async created () {
      this.$client.getTopics(this.id)
        .then((resp) => {
            this.$root.$emit('topic-visited', resp.data.subforum)
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
