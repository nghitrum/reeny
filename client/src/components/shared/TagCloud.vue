<style scoped>
span {
  line-height: 1em;
}
</style>
<template>
  <div>
    <span v-for="tag in tags" :key="tag.id" v-bind:style="{fontSize: (((tag.count - tags[9].count)*(max - min) / (tags[0].count - tags[9].count )) + min) * 0.5 +'em'}">
      <router-link :to="{ name: 'User'}">{{tag.name}}</router-link>&nbsp;
    </span>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const queryTags = gql`
  query tags {
    tags(number:10) {
      id
      name
      count
    }
  }
`

export default {
  data () {
    return {
      tags: [],
      max: 10,
      min: 1
    }
  },
  apollo: {
    tags: {
      query: queryTags
    }
  }
}
</script>
