import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const TodosView = () => import('../views/TodosView.vue')
const TodoDetailView = () => import('../views/TodoDetailView.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView,
    },
    {
      path: '/todos/:id',
      name: 'todo-detail',
      component: TodoDetailView,
      props: true,
    },
  ],
})
