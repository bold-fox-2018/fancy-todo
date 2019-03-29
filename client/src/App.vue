<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
      <TodoList/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import TodoList from '@/components/todoList.vue'


export default {
  name: 'home',
  components: {
    Navbar,
    TodoList,
  }
}
</script>
