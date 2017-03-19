
<template>
  <div>
    {{ num }}
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
      num: this.count
    }
  },
  created() {
    setInterval(() => {
      this.num += 1
    }, 1200)
  }
}

</script>

<style scoped>

div {
  display: grid;
}

</style>
