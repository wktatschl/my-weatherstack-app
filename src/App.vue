<template>
  <WeatherView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherView from '@/views/WeatherView.vue';

export default defineComponent({
  name: 'App',
  components: {
    WeatherView
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
