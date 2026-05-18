<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()

onMounted(() => {
  void todoStore.loadTodos()
})
</script>

<template>
  <section class="section">
    <header class="header">
      <h2>Список задач</h2>
      <div class="actions">
        <button class="btn" type="button" :disabled="todoStore.isLoading" @click="todoStore.refreshTodos()">
          Обновить
        </button>
      </div>
    </header>

    <p v-if="todoStore.isLoading">Загрузка...</p>

    <div v-else-if="todoStore.error" class="error">
      <p>Ошибка: {{ todoStore.error }}</p>
      <button class="btn" type="button" @click="todoStore.loadTodos({ force: true })">Повторить</button>
    </div>

    <ul v-else class="list">
      <TodoItem v-for="t in todoStore.todos" :key="t.id" :todo="t" />
    </ul>
  </section>
</template>

<style scoped>
.section {
  display: grid;
  gap: 12px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.list {
  display: grid;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.error {
  border: 1px solid rgba(255, 82, 82, 0.25);
  background: rgba(255, 82, 82, 0.08);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 8px;
}
</style>
