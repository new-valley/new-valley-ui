<template>
<div>
  <v-layout row wrap justify-center>
     <v-flex xs12>
       <v-card dark color="blue-grey darken-2" class="white--text">
          <v-card-title style="padding-top: 20px;" primary-title>
            <div>
              <router-link :to="to">
                <div class="headline">{{ title }}</div>
              </router-link>
              <span>{{ description }}</span>
            </div>
          </v-card-title>
         <v-layout row wrap justify-start style="padding: 4px 20px 20px 16px;">
           <v-flex xs3>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs3><p style="margin: 0;" class="text-xs-center"><v-icon>insert_drive_file</v-icon></p></v-flex>
               <v-flex xs9><p style="margin: 0 0 0 8px; font-size: 100%; overflow: hidden;" class="text-xs-left">
                 {{ nTopics }}
               </p></v-flex>
             </v-layout>
           </v-flex>
           <v-flex xs6>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs2><p style="margin: 0;" class="text-xs-center"><v-icon>today</v-icon></p></v-flex>
               <v-flex xs10><p style="margin: 0 0 0 8px; overflow: hidden;" class="text-xs-left">
                 {{ lastPostDatetime }}
               </p></v-flex>
             </v-layout>
           </v-flex>
           <v-flex xs3>
             <v-layout row wrap justify-center align-center fill-height>
               <v-flex xs2><p style="margin: 0;" class="text-xs-center"><v-icon>directions_walk</v-icon></p></v-flex>
               <v-flex xs10><p style="margin: 0 0 0 8px; font-size: 100%; overflow: hidden;" class="text-xs-left">
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
        default: 'subforum'
      },
      description: {
        type: String,
        required: false,
        default: 'description'
      },
      nTopics: {
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
