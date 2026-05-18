<script setup lang="ts">
import type { Todo } from '../types/todo'

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <section class="card">
    <h2>Задача #{{ todo.id }}</h2>
    <p class="title">{{ todo.title }}</p>

    <div class="row">
      <span class="label">Статус</span>
      <span class="status" :class="todo.completed ? 'done' : 'todo'">
        {{ todo.completed ? 'Выполнено' : 'Не выполнено' }}
      </span>
    </div>

    <div class="row">
      <span class="label">User ID</span>
      <span>{{ todo.userId }}</span>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 10px;
}

.title {
  opacity: 0.9;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.label {
  opacity: 0.7;
}

.status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}

.status.todo {
  background: rgba(255, 184, 0, 0.12);
  border-color: rgba(255, 184, 0, 0.2);
}

.status.done {
  background: rgba(0, 200, 83, 0.12);
  border-color: rgba(0, 200, 83, 0.2);
}
</style>
