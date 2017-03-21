
<template>
  <main id="app">
    <header>
      hello, vue !
    </header>
    <section>
      <h3>foo init: {{ fooCount }}</h3>
      <foo :count="fooCount"></foo>
    </section>
    <section>
      <h3>bar init: {{ barCount }}</h3>
      <bar :count="barCount"><bar>
    </section>
    <footer>
      {{ count }}
    </footer>
  </main>
</template>

<script>

import Bar from './bar'
import Foo from './foo'

export default {
  name: 'app',
  components: {
    Foo,
    Bar
  },
  data() {
    return {
      fooCount: 2,
      barCount: 1,
      count: 0
    }
  },
  created() {
    setInterval(() => {
      this.count += 1
    }, 1100)
  }
}

</script>

<style scoped>

main {
  display: grid;
}

</style>
