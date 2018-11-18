<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" dark>Entrar</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Entrar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Senha" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Logar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false
      }
    }
  }
</script>
