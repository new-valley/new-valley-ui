import listCard from '../components/ListCard.vue'
import avatar from '../components/Avatar.vue'
import listItem from '../components/ListItem.vue'

const listsMixin = {
  components: {
    avatar,
    listItem,
    listCard
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}

export default listsMixin