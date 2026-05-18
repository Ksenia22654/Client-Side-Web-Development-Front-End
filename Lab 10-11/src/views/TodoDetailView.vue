<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'
import TodoDetail from '../components/TodoDetail.vue'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

const idParam = computed(() => route.params.id)
const todoId = computed(() => Number(idParam.value))

const localLoading = ref(false)

const todo = computed(() => {
  const id = todoId.value
  if (!Number.isFinite(id)) return null
  return todoStore.getTodoFromStateById(id)
})

const load = async () => {
  const id = todoId.value
  if (!Number.isFinite(id)) return

  localLoading.value = true
  try {
    await todoStore.loadTodoById(id)
  } finally {
    localLoading.value = false
  }
}

onMounted(() => {
  void load()
})

watch(todoId, () => {
  void load()
})
</script>

<template>
  <section class="section">
    <header class="header">
      <h1>Детали задачи</h1>
      <button class="btn" type="button" @click="router.push('/todos')">Назад к списку</button>
    </header>

    <p v-if="todoStore.isLoading || localLoading">Загрузка...</p>

    <div v-else-if="todoStore.error" class="error">
      <p>Ошибка: {{ todoStore.error }}</p>
      <button class="btn" type="button" @click="todoStore.loadTodoById(todoId, { force: true })">Повторить</button>
    </div>

    <p v-else-if="!todo">Задача не найдена.</p>

    <TodoDetail v-else :todo="todo" />
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

.btn {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
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
