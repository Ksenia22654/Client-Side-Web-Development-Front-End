import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useTodosFetch } from '../compositions/fetch/useTodosFetch'
import type { Todo } from '../types/todo'

type CachedTodosPayload = {
  value: Todo[]
  cachedAt: number
}

const TODOS_CACHE_KEY = 'todos_cache_v1'
const TODOS_CACHE_TTL_MS = 5 * 60 * 1000

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const cachedTodos = useLocalStorage<CachedTodosPayload | null>(TODOS_CACHE_KEY, null)

  const todosCount = computed(() => todos.value.length)
  const completedTodos = computed(() => todos.value.filter((t) => t.completed))

  const getTodoFromStateById = (id: number) => todos.value.find((t) => t.id === id) || null

  const isCacheValid = () => {
    if (!cachedTodos.value) return false
    return Date.now() - cachedTodos.value.cachedAt < TODOS_CACHE_TTL_MS
  }

  const setCache = (value: Todo[]) => {
    cachedTodos.value = {
      value,
      cachedAt: Date.now(),
    }
  }

  const loadTodos = async (opts?: { force?: boolean }) => {
    const force = opts?.force ?? false

    error.value = null

    if (!force && isCacheValid()) {
      todos.value = cachedTodos.value!.value
      return
    }

    isLoading.value = true
    try {
      const { getTodos } = useTodosFetch()
      const data = await getTodos()
      todos.value = data
      setCache(data)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  const loadTodoById = async (id: number, opts?: { force?: boolean }) => {
    const force = opts?.force ?? false

    error.value = null

    const fromState = getTodoFromStateById(id)
    if (fromState && !force) return fromState

    isLoading.value = true
    try {
      const { getTodoById } = useTodosFetch()
      const todo = await getTodoById(id)

      const existingIndex = todos.value.findIndex((t) => t.id === todo.id)
      if (existingIndex >= 0) {
        todos.value[existingIndex] = todo
      } else {
        todos.value.push(todo)
      }

      if (!force && isCacheValid() && cachedTodos.value) {
        const cacheIndex = cachedTodos.value.value.findIndex((t) => t.id === todo.id)
        if (cacheIndex >= 0) cachedTodos.value.value[cacheIndex] = todo
      }

      return todo
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return null
    } finally {
      isLoading.value = false
    }
  }

  const refreshTodos = async () => loadTodos({ force: true })

  const clearError = () => {
    error.value = null
  }

  return {
    todos,
    isLoading,
    error,

    todosCount,
    completedTodos,

    getTodoFromStateById,
    loadTodos,
    loadTodoById,
    refreshTodos,
    clearError,
  }
})
