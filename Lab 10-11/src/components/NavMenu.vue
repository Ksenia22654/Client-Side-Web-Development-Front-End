<script setup lang="ts"></script>

<template>
  <nav class="nav">
    <RouterLink class="link" active-class="active" to="/" end>Главная</RouterLink>
    <RouterLink class="link" active-class="active" to="/todos">Задачи</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 12px 0;
}

.link {
  color: inherit;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  opacity: 0.85;
}

.link:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.06);
}

.active {
  opacity: 1;
  background: rgba(100, 108, 255, 0.18);
}
</style>
