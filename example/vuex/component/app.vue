
<template>
  <main id="app">
    <header>
      hello, vue !
    </header>
    <footer>
      {{ $store.state.count }}
    </footer>
  </main>
</template>

<script>

export default {
  name: 'app',
  created() {
    setInterval(() => {
      this.$store.setCount(Date.now() % 100)
    }, 1100)
  }
}

</script>

<style scoped>

main {
  display: grid;
}

</style>
