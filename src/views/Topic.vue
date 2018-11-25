<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-layout column>
          <v-flex xs12>
            <v-card dark>
            <v-layout row justify-center>
              <v-flex xs11 sm11>
                <v-card flat dark style="min-height: 40px; padding-top: 6px;">
                  <h2 class="text-xs-center"
                      style="overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;"
                  >
                    {{ title }}
                  </h2>
                </v-card>
              </v-flex>
              <v-flex xs1 v-if="canDeleteTopic">
                <v-layout row justify-center align-center fill-height>
                  <v-flex xs12 offset-sm4>
                    <v-card flat dark>
                      <yes-no-dialog
                        :onYes="deleteTopic"
                        :message="'deletar tópico?'"
                      />
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            </v-card>
          </v-flex>
          <v-divider dark></v-divider>
        </v-layout>
        <post-list-item v-for="item in items" :key="item.post_id"
          :message="item.message"
          :postNum="item.postNum"
          :showDeleteButton="item.showDeleteButton"
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
  import Reply from '../components/Reply'
  import LoadMoreButton from '../components/LoadMoreButton'
  import YesNoDialog from '../components/YesNoDialog'
  export default {
    components: {
      YesNoDialog,
      PostListItem,
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
        currPagePosts: new Set([]),
        topic: null
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
        const me_id = this.$client.isLoggedIn()?this.$session.getUser().user_id:null;
        posts.data.map((post, index) => {
          const item = {
            message: post,
            postNum: this.fetchOffset + this.nPostsLoaded + index,
            showDeleteButton: post.user.user_id === me_id
          }
          this.items.push(item)
          this.currPagePosts.add(post.post_id)
        })
        this.nPostsLoaded += posts.data.length
        this.lastPostLoaded = (this.fetchOffset + this.nPostsLoaded) >= posts.total
        this.setNBlocks(posts)
      },
      setTopic(data) {
        this.topic = data
      },
      setTitle(title) {
        this.title = title
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
      },
      resetPostsList() {
        this.items = []
        this.nPostsLoaded = 0
        this.currPagePosts.clear()
      },
      handlePostDeletion(postId) {
        if(this.currPagePosts.has(postId)) {
          this.resetPostsList()
          this.fetchPostsBlock()
        }
      },
      deleteTopic() {
        this.$client.delete('/topics', this.id)
          .then(() => {
            alert('topic ' + this.id + ' deleted')
            this.$router.push('/s/' + this.topic.subforum.subforum_id)
          })
          .catch(error => {
            alert(this.$client.formatErrorMessage(error))
          })
      }
    },
    async created () {
      this.$client.getTopics(this.id)
        .then((resp) => {
            this.$root.$emit('topic-visited', resp.data.subforum)
            this.setTopic(resp.data)
            this.setTitle(resp.data.title)
        })
      this.updateUserLoggedInInfo()
      this.$root.$on('login', this.updateUserLoggedInInfo)
      this.$root.$on('logout', this.updateUserLoggedInInfo)
      this.fetchPostsBlock().then(() => { this.setLoadMoreUpdater() })
      this.$root.$on('topic-reply-sent', this.updateLastPostLoaded)
      this.$root.$on('post-deleted', this.handlePostDeletion)
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
      },
      canDeleteTopic() {
        let ret = false
        if(this.userIsLoggedIn) {
          const user = this.$session.getUser()
          if(user && this.topic && this.topic.user) {
            ret = user.user_id == this.topic.user.user_id || user.username == 'su'
          }
        }
        return ret
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
