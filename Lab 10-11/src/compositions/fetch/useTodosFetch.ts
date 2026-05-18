import type { Todo } from '../../types/todo'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const useTodosFetch = () => {
  const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos`)

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as Todo[]
  }

  const getTodoById = async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch todo #${id}: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as Todo
  }

  return {
    getTodos,
    getTodoById,
  }
}
