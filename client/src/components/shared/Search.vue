<template>
  <div>
    <input class="form-control mr-sm-2" type="search" v-model.trim="userInput" @keyup.enter="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-secondary my-2 my-sm-0" type="button" @click="search">Search</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInput: ''
    }
  },
  methods: {
    search () {
      // console.log(this.userInput)
      this.$router.push({ name: 'Search', params: { search: this.userInput } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
