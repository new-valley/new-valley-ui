const listItemMixin = {
    props: {
        title: {
            required: true,
            type: String
        },
        subtitle: {
            required: false,
            type: String
        },
        to : {
            required: false,
            type: String
        }
    }
}

export default listItemMixin
