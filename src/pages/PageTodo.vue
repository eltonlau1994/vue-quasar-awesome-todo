<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
    </div>
    <p v-if="!Object.keys(tasksTodo).length && search && !Object.keys(tasksCompleted).length">No search results.</p>
    <no-tasks  v-if="!Object.keys(tasksTodo).length && !search"></no-tasks>
    <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"></tasks-todo>
    <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length"></tasks-completed>
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>
    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false"></AddTask>
    </q-dialog>
  </q-page>
</template>

<script>
import AddTask from "../components/Modals/AddTask"
import TasksTodo from "../components/Tasks/TasksTodo"
import TasksCompleted from "../components/Tasks/TasksCompleted"
import NoTasks from '../components/Tasks/NoTasks'
import Search from '../components/Tasks/Tools/Search'
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    AddTask,
    TasksTodo,
    TasksCompleted,
    NoTasks,
    Search
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState('tasks', ['search'])
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  }
};
</script>

<style>

</style>
