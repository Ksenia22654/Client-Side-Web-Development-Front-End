<script setup lang="ts">
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="app">
    <NavMenu />
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

.main {
  padding-top: 8px;
}
</style>
