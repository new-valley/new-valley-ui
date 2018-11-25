<template>
<div>
  <v-layout row wrap justify-center>
      <v-flex xs12 style="max-width: 200px;">
        <v-card color="blue-grey darken-2" class="white--text" style="padding: 2px;">
          <v-layout column>
            <v-flex style="padding: 2px;">
              <v-layout row justify-center align-center fill-height>
                <router-link :to='userLink'>
                  <h4 style="overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;" class="text-xs-center">{{ username }}</h4>
                </router-link>
              </v-layout>
            </v-flex>
            <v-flex style="padding: 2px;">
              <v-layout row justify-center align-center fill-height>
                <v-img
                  :src="avatarUri"
                  aspect-ratio="1"
                  max-width="100px"
                ></v-img>
              </v-layout>
            </v-flex>
            <v-flex style="padding: 2px;">
              <v-layout row justify-space-around justify-center align-center fill-height>
                <v-flex xs6>
                  <p style="margin: 0;" class="text-xs-center">
                    <v-icon small>mail</v-icon>
                    {{ nPosts }}
                  </p>
                </v-flex>
                <v-flex xs6 style="padding: 2px;">
                  <p style="margin: 0;" class="text-xs-center">
                    <v-icon small>insert_drive_file</v-icon>
                    {{ nTopics }}
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex style="padding: 2px;">
              <v-layout row justify-center align-center fill-height>
                <v-flex xs12 style="padding: 2px;" class="text-xs-center">
                  <p style="margin: 0;" class="text-xs-center">
                    <v-icon small>star</v-icon>
                    {{ creationDate }}
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider vertical/>
        </v-card>
      </v-flex>
  </v-layout>
</div>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      username: {
        type: String,
        required: false,
        default: 'user'
      },
      nPosts: {
        type: Number,
        required: false,
        default: 0
      },
      nTopics: {
        type: Number,
        required: false,
        default: 0
      },
      avatarUri: {
        type: String,
        required: false,
        default: 'http://forum.imguol.com/avatars/gallery/PC%20(4)/pc198.jpg'
      },
      createdAt: {
        type: String,
        required: false,
        default: '1994-06-15'
      },
      userLink: {
        type: String,
        required: false,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    computed: {
      creationDate() {
        return moment(this.createdAt).format('DD/MM/YYYY')
      }
    }
  }
</script>
