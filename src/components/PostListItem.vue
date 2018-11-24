<template>
<div>
<v-layout row wrap fill-height>
<!--user card and content-->
<v-flex>
<v-card dark>
<v-layout row wrap justify-space-around fill-height>
<!-- USER CARD -->
<v-flex xs4 sm2 style="min-width: 100px; max-width: 130px;">
  <user-card style="margin: 1px;"
    :username="message.user.username"
    :nPosts="message.user.n_posts"
    :nTopics="message.user.n_topics"
    :avatarUri="message.user.avatar.uri"
    :createdAt="message.user.created_at"
  />
</v-flex>
<!-- END OF USER CARD -->
<!--content-->
<v-flex xs8 sm10>
<v-card flat height="100%" style="padding: 8px;">
    <v-layout column fill-height>
      <v-flex xs11>
        <v-card flat>
          <p style="margin: 0; overflow-wrap: break-word;">
           {{ message.content }}
          </p>
        </v-card>
      </v-flex>
      <v-divider light/>
      <v-flex xs1 style="padding-top: 4px;">
        <v-card flat>
          <v-layout row>
            <v-flex xs4 sm8><v-card flat></v-card></v-flex xs6>
            <v-flex xs8 sm4><v-card flat>
              <v-layout row wrap justify-center align-center fill-height>
                <v-flex xs2><p style="margin: 0;" class="text-xs-right">
                  <v-icon small>calendar_today</v-icon>
                </p></v-flex>
                <v-flex xs10><p style="margin: 0 0 0 10px;">
                  {{ postDatetime }}
                </p></v-flex>
              </v-layout>
            </v-card></v-flex xs6>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
</v-card>
</v-flex>
<!--end of content-->
</v-layout>
          <v-divider dark/>
</v-card>
</v-flex>
<!--end of user card and content-->
</v-layout>
</div>
</template>
<script>
  import moment from 'moment'
  import UserCard from './UserCard'
  export default {
    components: {
      UserCard
    },
    props: {
      message: {
        type: Object,
        required: true,
      }
    },
    data () {
      return {
      }
    },
    computed: {
      postDatetime() {
        return moment(this.message.created_at).format('DD/MM/YYYY HH:mm')
      }
    }
  }
</script>
