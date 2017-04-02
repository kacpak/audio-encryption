<template>
  <div id="app">
    Hello in Vue, {{ name }}
  </div>
</template>

<script lang="typescript">
  export default {
    name: 'App',
    data () {
      return {
        name: 'Matt'
      }
    }
  }
</script>
