
<template>
  <main>
    <h1>{{ foo }}</h1>
    <h2>{{ bar }}</h2>
    <h3>{{ count }}</h3>
  </main>
</template>

<script>

export default {
  name: 'app',
  data: function() {
    return {
      foo: 'hello',
      bar: 'world',
      count: 0
    }
  },
  created: function() {
    setInterval(() => {
      this.count += 1
    }, 1000)
  }
}

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
