<template>
  <TodoList msg="Todolist (without store)"/>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Todo',
  components: {
    TodoList
  }
}
</script>
