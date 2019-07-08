<template>
  <q-page class="q-pa-md">
    <q-list bordered separator v-if="Object.keys(tasks).length">
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"></task>
    </q-list>
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
import Task from "../components/Tasks/Task.vue";
import AddTask from "../components/Modals/AddTask"
import { mapGetters } from "vuex";
export default {
  components: {
    Task,
    AddTask
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters("tasks", ["tasks"])
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
  }
};
</script>

<style>
</style>
