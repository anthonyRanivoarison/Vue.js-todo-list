<template>
  <div class="container">
    <todoList />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import todoList from '@/components/todoList.vue'
export default defineComponent({
  name: 'mainView',
  components: {
    todoList
  },
  setup() {}
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
