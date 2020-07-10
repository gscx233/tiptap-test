<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <DragHandle/>
  </div>
</template>

<script>
import DragHandle from './components/DragHandle'

export default {
  name: 'App',
  components: {
    DragHandle,
  }
}
</script>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 80%;  
}
</style>
