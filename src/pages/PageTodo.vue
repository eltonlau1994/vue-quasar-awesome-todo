<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">

      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search />
        </div>
        <p v-if="!Object.keys(tasksTodo).length && search && !Object.keys(tasksCompleted).length">No search results.</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <div class="relative-position">
            <no-tasks  v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-tasks>
            <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"></tasks-todo>
            <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" class="q-mb-xl"></tasks-completed>
          </div>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            class="all-pointer-events"
            color="primary"
            size="24px"
            icon="add"
          />
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </template>

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
    ...mapGetters("settings", ["settings"]),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
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

<style lang="stylus">
  .q-scroll-area-tasks
    display: flex
    flex-grow: 1
</style>
