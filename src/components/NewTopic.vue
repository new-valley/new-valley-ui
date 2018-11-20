<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" dark>Novo Tópico</v-btn>
      <v-card>
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
                <v-text-field v-model="content" label="Texto" required></v-text-field>
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
        content: ''
      }
    },
    methods: {
      async sendNewTopic() {
        if(!this.$client.isLoggedIn()) {
          alert('must log in to create topic')
        } else if (this.title && this.content) {
          this.$client.createTopic(this.subforum_id, this.title, this.content)
            .then(post => {
              alert('topic created')
            })
            .catch(error => {
              console.log('ERROR', error)
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
