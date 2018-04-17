<style scoped>
span {
  line-height: 1em;
}
</style>
<template>
  <div>
    <span v-for="(tag, index) in tags" :key="tag.id" v-bind:style="{fontSize: 3 - index * 0.1 * tag.count +'em'}">
      <router-link :to="{ name: 'Tag'}">{{tag.name}}</router-link>&nbsp;
    </span>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const queryTags = gql`
query getTags($max: Int) {
    tags(number: $max) {
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
      query: queryTags,
      variables () {
        return {
          max: this.max
        }
      }
    }

  }
}
</script>
