<template>
  <TodoList msg="Todolist"/>
</template>

<script>
import TodoList from '@/components/Todolist.vue'

export default {
  name: 'Todo',
  components: {
    TodoList
  }
}
</script>
