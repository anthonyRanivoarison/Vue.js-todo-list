<template>
  <div class="todo-container">
    <span class="task-input d-flex align-items-center gap-2">
      <input 
        type="text" 
        v-model="newTask" 
        @keyup.enter="addTask()" 
        placeholder="Enter your task here"
        class="todo-input" 
      />
    </span>
    <br>
    <span class="inline-block d-flex align-items-center">
      <h4>{{ todaysDate }}</h4>
      <div class="vertical-line"></div>
      <h4>Total: {{ tasks.length }}</h4>
    </span>
    <ul class="todo-list" v-if="tasks.length > 0">
      <li v-for="(task, index) in tasks" :key="index" class="todo-item">
        {{ task }}
        <button @click="deleteTask(index)" class="btn btn-danger"><i class="bi bi-trash"></i></button>
      </li>
    </ul>
    <h2 v-else class="no-task text-center">Empty list !</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const newTask = ref("")
const tasks = ref([])
const STORAGE_KEY = 'vue-tasks'

// * About dates
let date = new Date();
const options = { weekday: "long", year: "numeric", "month": "long", "day": "numeric" };
let dateFormatted = date.toLocaleDateString("fr-Fr", options);
let todaysDate = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value.trim())
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    tasks.value = JSON.parse(saved)
  }
});

watch(tasks, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })
</script>

<style scoped>
.todo-container {
  position: relative;
  width: 100%;
  height: 80vmin;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(rgb(191, 192, 193) 7.2%, transparent 0px) 0% 0% / 25px 25px rgb(241, 245, 248);
}

.todo-input {
  width: 100%;
  font-size: 1.5rem;
  border: none;
  border-bottom: 4px dashed #efad33;
  background-color: transparent;
  outline: none;
  transition: border-bottom-color 0.3s ease;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dotted #ddd;
  font-size: 1.5rem;
}

.inline-block {
  justify-content: space-between;
}

.vertical-line {
  width: 2px;
  height: 30px;
  background-color: gray;
}

.no-task {
  position: absolute;
  bottom: 50%;
  right: 30%;
}
</style>