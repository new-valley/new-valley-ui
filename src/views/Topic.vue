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
              <v-flex xs6 sm6 v-if="nBlocks > 1">
                <v-card flat style="padding: 10px;">
                <v-layout row justify-center>
                  <v-menu offset-y>
                    <v-btn
                      slot="activator"
                      dark
                      >Ir a bloco</v-btn>
                    <v-list style="overflow: scroll; max-height: 300px">
                      <v-list-tile
                        v-for="i in nBlocks"
                        :key="i"
                        @click="goToBlock(i)"
                      >
                      <v-list-tile-title>bloco {{ i }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-layout>
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
      },
      numItems: {
        type: Number,
        required: false,
        default: 4
      }
    },
    data () {
      return {
        items: [
        ],
        daemons: [
        ],
        userIsLoggedIn: false,
        nPostsLoaded: 0,
        lastPostLoaded: false,
        title: 'topic',
        loadMoreButtonUpdateFrequency: 45000,
        maxFetchNumPosts: 100,
        nBlocks: 1,
      }
    },
    methods: {
      goToBlock(i) {
        const offset = (i - 1)*this.fetchNumPosts
        this.$router.push({
          name: 't',
          query: {
            'n_items': this.fetchNumPosts,
            'offset': offset
          }
        })
        this.$router.go()
      },
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
        this.lastPostLoaded = (this.fetchOffset + this.nPostsLoaded) >= posts.total
        this.setNBlocks(posts)
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
      setNBlocks(posts) {
        this.nBlocks = Math.ceil(posts.total/Math.max(this.fetchNumPosts, 1))
      },
      updateLastPostLoaded() {
        this.$client.getTopics(this.id, 'posts', `max_n_results=0&fields=`)
          .then(p => {
            this.lastPostLoaded = (this.fetchOffset + this.nPostsLoaded) >= p.total
            this.setNBlocks(p)
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
    },
    computed: {
      fetchNumPosts() {
        return Math.max(
          Math.min(
            isNaN(this.numItems)?0:this.numItems, this.maxFetchNumPosts), 0)
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
