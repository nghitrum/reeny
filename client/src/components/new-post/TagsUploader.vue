<template>
  <div>
    <div class="added-tags">
      <span @click="deleteTag" class="badge badge-pill badge-secondary badge-lg m-1" v-for="tag in addedTags" :key="tag.id">{{tag.name}}</span>
      <span @click="deleteNewTag" class="badge badge-pill badge-info badge-lg m-1" v-for="tag in newTags" :key="tag">{{tag}}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">#</span>
      </div>
      <input v-on:keydown.enter.prevent='doNothing' type="text" class="form-control" v-model="search" @keyup="filterTags">
    </div>
    <ul class="list-group list-group-flush" v-if="isPressed">
      <li class="list-group-item list-group-item-action" v-for="tag in current" :key="tag.id" @click="clickTag">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const queryTags = gql`
  query tagQuery {
    allTags {
      id
      name
      count
    }
  }
`
export default {
  data () {
    return {
      allTags: [],
      tags: [],
      current: [],
      isPressed: false,
      search: '',
      addedTags: [],
      newTags: []
    }
  },
  methods: {
    doNothing (event) {
      event.preventDefault()
    },
    filterTags (event) {
      if (event.target.value === '') {
        this.isPressed = false
      } else {
        this.isPressed = true
      }

      if (event.keyCode === 13) {
        // enter
        let value = event.target.value
        let tag = this.allTags.filter(function (tag) {
          return tag.name === value
        })[0]

        if (tag) {
          this.addTag(tag)
        } else {
          this.addTag(value)
        }

        // always clear searchbox when added
        this.reset()
      } else {
        this.current = this.allTags.filter(function (tag) {
          return tag.name.includes(event.target.value)
        })
        // console.log(this.current)
      }
    },
    // click event handler
    clickTag (event) {
      this.addTag(this.allTags.filter(function (tag) {
        return tag.name === event.target.innerText
      })[0])
    },
    // add tag to array to show
    addTag (tag) {
      if (typeof tag === 'string') {
        if (this.newTags.indexOf(tag) === -1) {
          this.newTags.push(tag)
        }
      } else {
        if (this.addedTags.indexOf(tag) === -1) {
          this.addedTags.push(tag)
        }
      }

      this.$emit('addTags', { 'old': this.addedTags, 'new': this.newTags })
    },
    // tag is clickable, delete a tag from array when clicked
    deleteTag (event) {
      let tag = this.allTags.filter(function (tag) {
        return tag.name === event.target.innerText
      })[0]

      let index = this.addedTags.indexOf(tag)
      this.addedTags.splice(index, 1)
    },
    deleteNewTag (event) {
      let index = this.newTags.indexOf(event.target.innerText)
      this.newTags.splice(index, 1)
    },
    // clear textbox
    reset () {
      this.search = ''
      this.isPressed = false
    }
  },
  created () {
    this.$apollo.query({
      query: queryTags
    }).then(res => {
      this.allTags = res.data.allTags
      this.allTags.forEach(tag => {
        this.tags.push(tag)
        this.current.push(tag)
      })
    })
  }
}
</script>

<style scoped>
.badge-lg {
  font-size: 100%;
  font-weight: 600;
}
.badge:hover {
  cursor: pointer;
  background-color: #545b62;
}
</style>
