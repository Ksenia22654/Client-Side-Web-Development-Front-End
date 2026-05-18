<script setup lang="ts">
import type { Todo } from '../types/todo'

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <li class="item">
    <RouterLink class="title" :to="`/todos/${todo.id}`">
      #{{ todo.id }} — {{ todo.title }}
    </RouterLink>

    <span class="status" :class="todo.completed ? 'done' : 'todo'">
      {{ todo.completed ? 'Выполнено' : 'Не выполнено' }}
    </span>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}

.title {
  color: inherit;
  text-decoration: none;
}

.title:hover {
  text-decoration: underline;
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
