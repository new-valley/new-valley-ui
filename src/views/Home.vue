<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-layout column>
          <v-flex xs12>
            <v-card flat dark style="min-height: 40px; padding-top: 6px;">
              <h2 class="text-xs-center">
                Subfórums
              </h2>
            </v-card>
          </v-flex>
        </v-layout>
        <subforum-list-item
          v-for="item in items" :key="item.subforum_id"
          :title=item.title
          :description=item.description
          :nTopics=item.nTopics
          :lastPostedAt=item.lastPostedAt
          :lastAuthor=item.lastAuthor
          :to=item.to
          :divider=item.divider
        ></subforum-list-item>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import BasicList from '../components/BasicListPage'
  import SubforumListItem from '../components/SubforumListItem'
  export default {
    components: {
      SubforumListItem,
      BasicList
    },
    async created () {
      const subs = await this.$client.getSubForums()
      subs.data.map(sub => {
        const item = {
          title: sub.title,
          description: sub.description,
          nTopics: sub.n_topics,
          lastPostedAt: sub.created_at,
          lastAuthor: 'user',
          to: `/s/${sub.subforum_id}`,
          divider: true
        }
        this.setLastTopicInfo(sub, item)
        this.items.push(item)
      })
    },
    data () {
      return {
        items: [
        ]
      }
    },
    methods: {
      setLastTopicInfo(sub, item) {
        this.$client.getSubForums(
          sub.subforum_id, 'topics', 'order=newest&max_n_results=1')
          .then(topics => {
            if(topics.total > 0) {
              item.lastPostedAt = topics.data[0].created_at
              item.lastAuthor = topics.data[0].user.username
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
