<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" dark>Entrar</v-btn>
      <v-card dark>
        <v-card-title>
          <span class="headline">Entrar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="input.email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="input.password" label="Senha" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click="login()">Logar</v-btn>
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
          password: ''
        }
      }
    },
    methods: {
      async login() {
        if(this.sanitizedEmail && this.input.password) {
          try {
            await this.$client.login(this.sanitizedEmail, this.input.password)
            alert(`user logged in`)
            this.dialog = false
          } catch(error)  {
              if(error.response.status === 400) {
                alert('invalid email or password')
              }
          }
          this.input.password = ''
          this.input.email = ''
          const user = await this.$client.getMe()
          this.$session.setUser(user.data)
          this.$root.$emit('login')
        }
      }
    },
    computed: {
      sanitizedEmail() {
        return this.input.email.trim()
      }
    }
  }
</script>
