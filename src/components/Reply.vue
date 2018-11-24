<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" fab style="background-color: #ff8700">
				<v-icon>add</v-icon>
			</v-btn>
      <v-card dark>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-textarea :rules="rules" auto-grow v-model="content" label="Texto" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="sendReply()">Enviar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      topic_id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dialog: false,
        content: '',
        rules: [v => !!v || "input is required"]
      }
    },
    methods: {
      async sendReply() {
        if(!this.$client.isLoggedIn()) {
          alert('must log in to reply to topic')
        } else if (!this.content) {
          alert('text must not be empty')
        } else {
          this.$client.replyTopic(this.topic_id, this.content)
            .then(post => {
              alert('reply sent')
              this.$root.$emit('topic-reply-sent')
            })
            .catch(error => {
              alert(this.$client.formatErrorMessage(error))
            })
            this.dialog = false
            this.content = ''
        }
      }
    }
  }
</script>
