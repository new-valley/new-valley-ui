<template>
    <v-list-tile-content>
        <router-link :to="to">
            <v-list-tile-title v-html="title" v-if="title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="subtitle" v-if="subtitle"></v-list-tile-sub-title>
        </router-link>
    </v-list-tile-content>
</template>

<script>
import { listItemMixin } from "../mixins"

export default {
  mixins: [listItemMixin]
}
</script>
