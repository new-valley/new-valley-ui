<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
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

        <topic-list-item
          v-for="item in items" :key="item.topic_id"
          :title=item.title
          :author=item.author
          :nPosts=item.nPosts
          :lastPostedAt=item.lastPostedAt
          :lastAuthor=item.lastAuthor
          :to=item.to
          :divider=item.divider
          :pinned=item.pinned
        ></topic-list-item>

        <v-flex xs12>
          <v-card dark>
            <v-layout row justify-center>
              <v-flex xs6 sm6 v-if="!lastTopicLoaded">
                <v-card flat style="padding: 10px;">
                  <load-more-button :onClick="fetchTopicsBlock"/>
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
      <new-topic v-if="userIsLoggedIn" :subforum_id="id"/>
			<v-btn fab style="background-color: #ff8700" @click="scrollToTop()">
				<v-icon>arrow_upward</v-icon>
			</v-btn>
		</v-layout>
  </div>
</template>

<script>
  import NewTopic from '../components/NewTopic'
  import TopicListItem from '../components/TopicListItem'
  import LoadMoreButton from '../components/LoadMoreButton'
  export default {
    components: {
      LoadMoreButton,
      TopicListItem,
      NewTopic
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
        default: 20
      }
    },
    data () {
      return {
        items: [
        ],
        daemons: [
        ],
        userIsLoggedIn: false,
        nTopicsLoaded: 0,
        lastTopicLoaded: false,
        title: 'subforum',
        loadMoreButtonUpdateFrequency: 45000,
        maxFetchNumTopics: 100,
        nBlocks: 1,
      }
    },
    async created () {
      this.$client.getSubForums(this.id)
        .then(resp => {
          this.setTitle(resp)
        })
      this.updateUserLoggedInInfo()
      this.$root.$on('login', this.updateUserLoggedInInfo)
      this.$root.$on('logout', this.updateUserLoggedInInfo)
      this.fetchPinnedTopics()
      this.fetchTopicsBlock().then(() => { this.setLoadMoreUpdater() })
      this.$root.$on('topic-created', this.updateLastTopicLoaded)
    },
    methods: {
      goToBlock(i) {
        const offset = (i - 1)*this.fetchNumTopics
        this.$router.push({
          name: 's',
          query: {
            'n_items': this.fetchNumTopics,
            'offset': offset
          }
        })
        this.$router.go()
      },
      setLastPostInfo(topic, item) {
        if(topic.last_post) {
          item.lastPostedAt = topic.last_post.created_at
          item.lastAuthor = topic.last_post.user.username
        }
      },
      async fetchTopics(statuses, order, maxNResults) {
        const offset = this.fetchOffset + this.nTopicsLoaded
        const topics = await this.$client.getSubForums(this.id, 'topics',
          `order=${order}&max_n_results=${maxNResults}&offset=${offset}&statuses=${statuses}`)
        topics.data.map(topic => {
            const item = {
              title: topic.title,
              author: topic.user.username,
              nPosts: topic.n_posts,
              lastPostedAt: topic.created_at,
              lastAuthor: 'user',
              to: `/t/${topic.topic_id}`,
              divider: true,
              pinned: statuses === 'pinned'
            }
            this.items.push(item)
            this.setLastPostInfo(topic, item)
          })
        this.nTopicsLoaded += topics.data.length
        this.lastTopicLoaded = (this.fetchOffset + this.nTopicsLoaded) >= topics.total
        return topics
      },
      async fetchPinnedTopics() {
        this.fetchTopics('pinned', 'newest', 999)
      },
      async fetchTopicsBlock() {
        const topics = await this.fetchTopics(
          'published', 'newest_last_post', this.fetchNumTopics)
        this.setNBlocks(topics)
      },
      setTitle(subforum) {
        this.title = subforum.data.title
      },
      scrollToTop() {
        this.$vuetify.goTo(0)
      },
      updateUserLoggedInInfo() {
        this.userIsLoggedIn = this.$client.isLoggedIn()
      },
      setNBlocks(topics) {
        this.nBlocks = Math.ceil(topics.total/Math.max(this.fetchNumTopics, 1))
      },
      updateLastTopicLoaded() {
        this.$client.getSubForums(this.id, 'topics', `max_n_results=0&fields=`)
          .then(p => {
            this.lastTopicLoaded = (this.fetchOffset + this.nTopicsLoaded) >= p.total
            this.setNBlocks(p)
          })
      },
      setLoadMoreUpdater() {
        this.daemons.push(setInterval(function(){
            this.updateLastTopicLoaded()
          }.bind(this) , this.loadMoreButtonUpdateFrequency))
      }
    },
    beforeDestroy() {
      for (let d of this.daemons) {
        clearInterval(d)
      }
    },
    computed: {
      fetchNumTopics() {
        return Math.max(
          Math.min(
            isNaN(this.numItems)?0:this.numItems, this.maxFetchNumTopics), 0)
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
