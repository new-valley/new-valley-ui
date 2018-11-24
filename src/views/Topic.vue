<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-layout column>
          <v-flex xs12>
            <v-card flat dark style="min-height: 40px; padding-top: 6px;">
              <h2 class="text-xs-center">
                {{ title }}
              </h2>
            </v-card>
          </v-flex>
          <v-divider dark></v-divider>
        </v-layout>
        <post-list-item v-for="item in items" :key="item.post_id"
          :message="item.message"
        />
        <v-flex xs12>
          <v-card dark>
            <v-layout row justify-center>
              <v-flex xs6 sm6 v-if="!lastPostLoaded">
                <v-card flat style="padding: 10px;">
                  <load-more-button :onClick="fetchPostsBlock"/>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
		<v-layout column class="fab-container">
      <reply v-if="userIsLoggedIn" :topic_id="id"/>
			<v-btn fab style="background-color: #ff8700" @click="scrollToTop()">
				<v-icon>arrow_upward</v-icon>
			</v-btn>
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
      },
      fetchOffset: {
        type: Number,
        required: false,
        default: 0
      }
    },
    data () {
      return {
        items: [
        ],
        daemons: [
        ],
        fetchNumPosts: 4,
        userIsLoggedIn: false,
        nPostsLoaded: 0,
        lastPostLoaded: false,
        title: 'topic',
        loadMoreButtonUpdateFrequency: 45000,
      }
    },
    methods: {
      async fetchPostsBlock() {
        const offset = this.fetchOffset + this.nPostsLoaded
        const posts = await this.$client.getTopics(
          this.id, 'posts',
          `order=oldest&max_n_results=${this.fetchNumPosts}&offset=${offset}`)
        posts.data.map(post => {
          const item = {
            message: post
          }
          this.items.push(item)
        })
        this.nPostsLoaded += posts.data.length
        this.lastPostLoaded = (this.fetchOffset + this.nPostsLoaded) == posts.total
      },
      setTitle(topic) {
        this.title = topic.data.title
      },
      scrollToTop() {
        this.$vuetify.goTo(0)
      },
      updateUserLoggedInInfo() {
        this.userIsLoggedIn = this.$client.isLoggedIn()
      },
      updateLastPostLoaded() {
        this.$client.getTopics(this.id, 'posts', `max_n_results=0&fields=`)
          .then(p => {
            this.lastPostLoaded = (this.fetchOffset + this.nPostsLoaded) == p.total
          })
      },
      setLoadMoreUpdater() {
        this.daemons.push(setInterval(function(){
            this.updateLastPostLoaded()
          }.bind(this) , this.loadMoreButtonUpdateFrequency))
      }
    },
    async created () {
      this.$client.getTopics(this.id)
        .then((resp) => {
            this.$root.$emit('topic-visited', resp.data.subforum)
            this.setTitle(resp)
        })
      this.updateUserLoggedInInfo()
      this.$root.$on('login', this.updateUserLoggedInInfo)
      this.$root.$on('logout', this.updateUserLoggedInInfo)
      this.fetchPostsBlock().then(() => { this.setLoadMoreUpdater() })
      this.$root.$on('topic-reply-sent', this.updateLastPostLoaded)
    },
    beforeDestroy() {
      for (let d of this.daemons) {
        clearInterval(d)
      }
    }
  }
</script>
<style>
  a {
    text-decoration: none;
    color: #ff8700 !important;
  }
  .fab-container {
		position: fixed;
		bottom: 12px;
		right: 12px;
	}
</style>
