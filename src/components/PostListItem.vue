<template>
<div>
<v-layout row wrap fill-height>
<!--user card and content-->
<v-flex>
<v-card dark>
<v-layout row wrap justify-space-around fill-height>
<!-- USER CARD -->
<v-flex xs4 sm3 style="min-width: 100px;">
  <user-card style="border-radius: 0;"
    :username="message.user.username"
    :nPosts="message.user.n_posts"
    :nTopics="message.user.n_topics"
    :avatarUri="message.user.avatar.uri"
    :createdAt="message.user.created_at"
  />
</v-flex>
<!-- END OF USER CARD -->
<!--content-->
<v-flex xs8 sm9>
<v-card flat height="100%" style="padding: 8px 8px 4px 8px;">
    <v-layout column fill-height>
      <v-flex xs11>
        <v-card flat>
          <p style="margin: 0; overflow-wrap: break-word;">
           {{ message.content }}
          </p>
        </v-card>
      </v-flex>
      <v-divider light/>
      <v-flex xs1>
        <v-card flat style="padding: 1px 0 2px 0;">
          <v-layout row wrap justify-end>
            <v-flex xs3 sm2 style="margin-top: 4px;"><v-card flat>
              <p style="margin: 0;" class="text-xs-center">
              # {{ postNum }}
              </p>
            </v-card></v-flex>
            <v-flex xs7 sm4 style="margin-top: 4px;"><v-card flat>
              <v-layout row wrap justify-center justify-space-between align-center fill-height>
                <v-flex xs2><p style="margin: 0;" class="text-xs-right">
                  <v-icon small>calendar_today</v-icon>
                </p></v-flex>
                <v-flex xs10><p style="margin: 0;">
                  {{ postDatetime }}
                </p></v-flex>
              </v-layout>
            </v-card></v-flex>
            <v-flex xs2 sm1>
              <yes-no-dialog
                :onYes="deleteMethod"
              />
            </v-flex>
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
  import axios from 'axios'
  import UserCard from './UserCard'
  import YesNoDialog from './YesNoDialog'
  export default {
    components: {
      YesNoDialog,
      UserCard
    },
    props: {
      message: {
        type: Object,
        required: true,
      },
      postNum: {
        type: Number,
        required: false,
        default: 0
      },
      showDeleteButton: {
        type: Boolean,
        required: false,
        default: false
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
    },
    methods: {
      deleteMethod() {
        this.$client.delete('/posts', this.message.post_id)
          .then(() => {
            alert('post ' + this.message.post_id + ' deleted')
            this.$root.$emit('post-deleted', this.message.post_id)
          })
          .catch(error => {
            alert(this.$client.formatErrorMessage(error))
          })
      }
    }
  }
</script>
