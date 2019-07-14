<template>
    <div class="q-mt-lg">
      <list-header bgColor="bg-green-4">Completed</list-header>
      <q-list bordered separator>
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
</template>

<script>
import Task from './Task'
import ListHeader from '../Shared/ListHeader'

export default {
  components: {
    Task,
    ListHeader
  },
  props: ['tasksCompleted']
}
</script>

