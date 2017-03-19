
<template>
  <div>
    <h1>{{ title }}</h1>
    <input v-model="message">
    <h3 :message="message"></h3>
    <users :items="items"></users>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'Hello, world !',
      message: 'foo',
      items: []
    }
  }
}

</script>

<style>
</style>
