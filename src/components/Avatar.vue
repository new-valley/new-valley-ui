<template>
    <v-list-tile-avatar tile>
        <img :src="src" v-if="src">
        <v-icon v-if="icon" v-html="'mdi-account'" />
    </v-list-tile-avatar>
</template>

<script>
import { avatarsMixin } from "../mixins"

export default {
  mixins: [avatarsMixin]
}
</script>
