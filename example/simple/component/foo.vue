
<template>
  <div>
    {{ num }}
  </div>
</template>

<script>

export default {
  name: 'foo',
  props: {
    count: Number,
    required: true
  },
  data() {
    return {
      num: this.count
    }
  },
  created() {
    setInterval(() => {
      this.num += 1
    }, 1000)
  }
}

</script>

<style scoped>

div {
  display: grid;
}

</style>
