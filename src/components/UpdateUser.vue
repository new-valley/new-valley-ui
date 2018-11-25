<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" dark>Editar</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Editar User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="input.email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="input.password" label="Senha" type="password" required></v-text-field>
                <v-text-field v-model="input.password2" label="Confirme a senha" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click="editUser()">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        input: {
          email: '',
          password: '',
          password2: ''
        }
      }
    },
    methods: {
      clearFields() {
        this.email = ''
        this.password = ''
        this.password2 = ''
        this.dialog = false
      },
      async editUser() {
        if(!this.$client.isLoggedIn()) {
          alert('user not logged in')
          return
        }
        const user = this.$session.getUser()
        if(!this.input.email || !this.input.password || !this.input.password2) {
          alert('all fields are required')
        } else if(this.input.password2 != this.input.password) {
          alert('passwords differ') 
        } else {
          this.$client.put('/users', user.user_id, null, {
            'email': this.input.email,
            'password': this.input.password
          }).then(() => {
            alert('usuário atualizado com sucesso')
            this.$root.$emit('hide-lat-menu-btn-clicked')
          }).catch(error => {
            alert(this.$client.formatErrorMessage(error))
          })
        }
        this.clearFields()
      }
    }
  }
</script>
