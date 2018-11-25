<template>
  <v-layout row justify-center>
    <v-btn
      dark
      @click="dialog = true"
      style="padding: 0; margin: 0 0 -6px 0; min-width: 0; min-height: 0;"
      small flat>
        <p style="margin: 0;" class="text-xs-center">
          <v-icon>{{ icon }}</v-icon>
        </p>
    </v-btn>

    <v-dialog
      dark
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ this.message }}</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="onClickNo"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="onClickYes"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    onYes: {},
    message: {
      type: String,
      required: false,
      default: 'confirmar operação?'
    },
    eventToEmit: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: 'delete'
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
    onClickYes() {
      this.onYes()
      this.dialog = false
    },
    onClickNo() {
      this.dialog = false
    }
  }
}
</script>
