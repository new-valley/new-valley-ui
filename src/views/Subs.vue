<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <topic-list-item
          v-for="item in items" :key="item.topic_id"
          :title=item.title
          :author=item.author
          :nPosts=item.nPosts
          :lastPostedAt=item.lastPostedAt
          :lastAuthor=item.lastAuthor
          :to=item.to
          :divider=item.divider
        ></topic-list-item>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="padding: 10px;">
          <new-topic v-if="$client.isLoggedIn()" :subforum_id="id"/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicList from '../components/BasicListPage'
  import NewTopic from '../components/NewTopic'
  import TopicListItem from '../components/TopicListItem'
  export default {
    components: {
      TopicListItem,
      BasicList,
      NewTopic
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
        ]
      }
    },
    async created () {
      const topics = await this.$client.getSubForums(this.id, 'topics')
      topics.data.map(topic => {
        const item = {
          title: topic.title,
          author: topic.user.username,
          nPosts: topic.n_posts,
          lastPostedAt: topic.created_at,
          lastAuthor: 'user',
          to: `/t/${topic.topic_id}`,
          divider: true
        }
        this.setLastPostInfo(topic, item)
        this.items.push(item)
      })        
    },
    methods: {
      setLastPostInfo(topic, item) {
        this.$client.getTopics(
          topic.topic_id, 'posts', 'order=newest&max_n_results=1')
          .then(posts => {
            if(posts.total > 0) {
              item.lastPostedAt = posts.data[0].created_at
              item.lastAuthor = posts.data[0].user.username
            }
          })
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
