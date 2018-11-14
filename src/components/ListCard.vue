 <template>
  <v-card>        
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
        >
          {{ item.header }}
        </v-subheader>

        <v-divider
          v-else-if="item.divider"
          :inset="item.inset"
          :key="index"
        ></v-divider>

        <v-list-tile
          v-else
          :key="item.title"
          avatar
        >
          <slot name="avatar" :src="item.avatar" />
          <slot name="item" :title="item.title" :subtitle="item.subtitle" :to="item.to"/>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
      }
    }
  }
</script>