<template>
  <div class="rating">
    <input type="radio" name="star" id="star5" value="5" @click="isCheck">
    <label for="star5"></label>
    <input type="radio" name="star" id="star4" value="4" @click="isCheck">
    <label for="star4"></label>
    <input type="radio" name="star" id="star3" value="3" @click="isCheck">
    <label for="star3"></label>
    <input type="radio" name="star" id="star2" value="2" @click="isCheck">
    <label for="star2"></label>
    <input type="radio" name="star" id="star1" value="1" @click="isCheck">
    <label for="star1"></label>
  </div>
</template>

<script>
export default {
  props: ['inputRating'],
  methods: {
    isCheck (event) {
      this.$emit('addRating', event.target.value)
    }
  },
  watch: {
    inputRating () {
      document.getElementById('star' + this.inputRating).checked = true
    }
  }
}
</script>

<style scoped>
.rating {
  direction: rtl;
}
.rating input {
  display: none;
}
.rating label {
  transition: all 0.2s;
  color: lightgray;
  font-size: 2em;
  font-weight: 900;
}
.rating label::before {
  font-family: 'Font Awesome 5 Solid';
  content: '\f005';
}
.rating label::before {
  display: none;
}

.rating label:hover,
.rating label:hover ~ label,
.rating input:checked ~ label {
  color: orange;
  cursor: pointer;
}
</style>
