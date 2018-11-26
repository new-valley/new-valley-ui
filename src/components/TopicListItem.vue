<template>
<div>
  <v-layout row wrap justify-center>
     <v-flex xs12>
       <v-card dark color="blue-grey darken-2" class="white--text">
          <v-card-title style="padding-top: 20px;" primary-title>
            <div>
              <router-link :to="to">
                <div class="headline">
                  {{ title }}
                  <span v-if="pinned">
                      <v-icon style="color: gray; margin-bottom: 3px; padding-left: 2px;">info</v-icon>
                  </span>
                </div>
              </router-link>
              <span>by <b>{{ author }}</b></span>
            </div>
          </v-card-title>
         <v-layout row wrap justify-center style="padding: 4px 20px 20px 16px;">
           <v-flex xs3>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs3><p style="margin: 0;" class="text-xs-center"><v-icon>mail</v-icon></p></v-flex>
               <v-flex xs9><p style="margin: 0 0 0 10px; overflow: hidden;" class="text-xs-left">
                 {{ nPosts }}
               </p></v-flex>
             </v-layout>
           </v-flex>
           <v-flex xs6>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs2 sm1><p style="margin: 0;" class="text-xs-center"><v-icon>today</v-icon></p></v-flex>
               <v-flex xs10 sm11><p style="margin: 0 0 0 8px; overflow: hidden;" class="text-xs-left">
                 {{ lastPostDatetime }}
               </p></v-flex>
             </v-layout>
           </v-flex>
           <v-flex xs3>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs2 sm1><p style="margin: 0;" class="text-xs-center"><v-icon>directions_walk</v-icon></p></v-flex>
               <v-flex xs10 sm11><p class="text-xs-left" style="margin: 0 0 0 8px; font-size: 100%; overflow: hidden;">
                 {{ lastAuthor }}
               </p></v-flex>
             </v-layout>
           </v-flex>
          </v-layout>
       <v-divider dark v-if="divider"/>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      title: {
        type: String,
        required: false,
        default: 'topic'
      },
      author: {
        type: String,
        required: false,
        default: 'user',
      },
      nPosts: {
        type: Number,
        required: false,
        default: 0
      },
      lastPostedAt: {
        type: String,
        required: false,
        default: '1984-01-02'
      },
      lastAuthor: {
        type: String,
        required: false,
        default: 'user'
      },
      to: {
        type: String,
        required: false,
        default: '/'
      },
      divider: {
        type: Boolean,
        required: false,
        default: false
      },
      pinned: {
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
      lastPostDatetime() {
        return moment(this.lastPostedAt).format('DD/MM/YYYY HH:mm')
      }
    }
  }
</script>
