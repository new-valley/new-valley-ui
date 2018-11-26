<template>
<div>
<v-layout row fill-height>
<!--user card and content-->
<v-flex>
<v-card dark color="blue-grey darken-2" class="white--text">
<v-layout row justify-space-around fill-height>
<!-- USER CARD -->
<v-flex xs4 sm3 style="min-width: 100px; padding: 1px;">
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
<v-card flat color="blue-grey darken-2" class="white--text" height="100%" style="padding: 8px 8px 4px 8px;">
    <v-layout column fill-height>
      <v-flex xs11>
        <v-card flat style="padding: 8px 8px 0 0;" color="blue-grey darken-2" class="white--text">
          <v-responsive>
            <p v-html="bbCodeParsedMessage" style="margin: 0; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;  white-space: pre-line; word-wrap: pre; text-align: justify;"></p>
          </v-responsive>
        </v-card>
      </v-flex>
      <v-divider light/>
      <v-flex xs1>
        <v-card flat color="blue-grey darken-2" class="white--text" style="padding: 1px 0 2px 0;">
          <v-layout row wrap justify-end>
            <v-flex xs3 sm2 style="margin-top: 4px;"><v-card flat color="blue-grey darken-2" class="white--text">
              <p style="margin: 0;" class="text-xs-center">
              #{{ postNum }}
              </p>
            </v-card></v-flex>
            <v-flex xs8 sm6 style="margin-top: 4px;"><v-card flat color="blue-grey darken-2" class="white--text">
              <v-layout row wrap justify-space-between align-center fill-height>
                <v-flex xs2><p style="margin: 0;" class="text-xs-center">
                  <v-icon small>calendar_today</v-icon>
                </p></v-flex>
                <v-flex xs10><p style="margin: 0;">
                  {{ postDatetime }}
                </p></v-flex>
              </v-layout>
            </v-card></v-flex>
            <v-flex xs1 sm1>
              <yes-no-dialog
                v-if="canDeletePost"
                :onYes="deleteMethod"
                :message="'deletar post?'"
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
  import bbCodeParser from 'js-bbcode-parser'
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
      },
      canDeletePost() {
        let ret = false
        if(this.$client.isLoggedIn()) {
          const user = this.$session.getUser()
          if(user) {
            ret = user.user_id == this.message.user.user_id || user.username == 'su'
          }
        }
        return ret
      },
      bbCodeParsedMessage() {
        let str = bbCodeParser.parse(this.message.content)
          .replace(/<img/g, '<img style="max-width: 100%; height: auto;"')
        return str
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
