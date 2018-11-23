<template>
  <list-card :items="items">
    <avatar  slot="avatar" slot-scope="scope" :src="scope.src" />  
    <list-item slot="item" slot-scope="scope" :title="scope.title" />
  </list-card>
</template>

<script>
  import { listsMixin } from '../mixins'

  export default {
    mixins: [listsMixin]
  }
</script>
