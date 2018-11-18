<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" dark>Responder</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Responder</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Texto" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Enviar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
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
