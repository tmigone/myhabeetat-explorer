<template>
  <div id="app">
    <MyHabeetat />
  </div>
</template>

<script>
import MyHabeetat from './components/MyHabeetat.vue'

export default {
  name: 'app',
  components: {
    MyHabeetat
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
