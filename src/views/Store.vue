<template>
  <div class="container">
    <h1>Todolist (Store)</h1>
    <AddTodo />
    <TodoList />
  </div>
</template>

<script>
import AddTodo from '@/components/Store/AddTodo.vue'
import TodoList from '@/components/Store/TodoList.vue'

export default {
  name: 'Store',
  components: {
    AddTodo,
    TodoList
  }
}
</script>

<style scoped>
  .container{
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
</style>