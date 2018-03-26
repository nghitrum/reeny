<template>
  <div class="d-flex flex-column align-items-center">
    <div>
      <vue-post class="m-3"></vue-post>
    </div>
    <div class="m-3">
      <tag-cloud></tag-cloud>
    </div>
  </div>
</template>
<script>

import Create from './CreateButton'
import TagCloud from './TagCloud'

export default {
  components: {
    'vue-post': Create,
    'tag-cloud': TagCloud
  }

}
</script>

<style scoped>

</style>
