<template>
  <div>

    <list-header bgColor="bg-orange-4">Todo</list-header>
    <q-list bordered separator>
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
import Task from "./Task";
import ListHeader from '../Shared/ListHeader'

export default {
  components: {
    Task,
    ListHeader,
  },
  props: ["tasksTodo"]
};
</script>
