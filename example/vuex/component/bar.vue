
<template>
  <div>
    <p>{{ num }}</p>
    <p v-if="msg !== 'init'">{{ msg }}</p>
  </div>
</template>

<script>

export default {
  name: 'bar',
  props: {
    count: Number,
    required: true
  },
  data() {
    return {
      num: this.count,
      msg: 'init'
    }
  },
  created() {
    setInterval(() => {
      this.num += 1
    }, 1200)

    setTimeout(() => {
      this.msg = 'bingo'
    }, 2000)
  }
}

</script>

<style scoped>

div {
  display: grid;
}

</style>
