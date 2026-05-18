<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
</script>

<template>
  <section class="section">
    <h1>Главная</h1>
    <p>Открой страницу задач, чтобы загрузить список.</p>

    <div class="stats">
      <div class="stat">
        <div class="label">Задач в памяти</div>
        <div class="value">{{ todoStore.todosCount }}</div>
      </div>
      <div class="stat">
        <div class="label">Выполнено</div>
        <div class="value">{{ todoStore.completedTodos.length }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  display: grid;
  gap: 12px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stat {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px;
}

.label {
  opacity: 0.7;
  font-size: 12px;
}

.value {
  font-size: 22px;
  margin-top: 4px;
}
</style>
