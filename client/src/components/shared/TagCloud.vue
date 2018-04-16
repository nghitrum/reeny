<style scoped>
span {
  line-height: 1em;
}
</style>
<template>
  <div>
    <span v-for="tag in tags" :key="tag.id" v-bind:style="{fontSize: (((tag.count - tags[(tags.length > max ? max : tags.length - 1)].count)*(max - min) / (tags[0].count - tags[(tags.length > max ? max : tags.length - 1)].count )) + min) * 0.5 +'em'}">
      <router-link :to="{ name: 'Search', params: { search: tag.name }}">{{tag.name}}</router-link>&nbsp;
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
