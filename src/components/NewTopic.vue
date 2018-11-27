<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" fab style="background-color: #ff8700">
				<v-icon>add</v-icon>
			</v-btn>
      <v-card dark>
        <v-card-title>
          <span class="headline">Novo Tópico</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="title" label="Título" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="rules" auto-grow v-model="content" label="Texto" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="sendNewTopic()">Enviar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      subforum_id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dialog: false,
        title: '',
        content: '',
        rules: [v => !!v || "input is required"]
      }
    },
    methods: {
      async sendNewTopic() {
        if(!this.$client.isLoggedIn()) {
          alert('must log in to create topic')
        } else if (this.title && this.content) {
          this.$client.createTopic(this.subforum_id, this.title, this.content)
            .then(topic => {
              alert('topic created')
              this.$root.$emit('topic-created')
              this.$router.push(`/t/${topic.data.topic_id}`)
            })
            .catch(error => {
              alert(this.$client.formatErrorMessage(error))
            })
            this.dialog = false
            this.title = ''
            this.content = ''
        } else {
          alert('title and content are required fields')
        }
      }
    }
  }
</script>
