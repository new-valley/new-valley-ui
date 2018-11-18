<template>
  <v-layout row justify-center>
    <v-btn dark @click="onClick">Carregar mais</v-btn>
  </v-layout>
</template>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: true,
      }
    },
    data() {
      return {}
    }
  }
</script>
