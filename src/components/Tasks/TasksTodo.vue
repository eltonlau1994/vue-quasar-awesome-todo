<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header bgColor="bg-orange-4" v-if="!settings.showTasksInOneList">Todo</list-header>
      <q-list bordered separator>
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import Task from "./Task";
import ListHeader from '../Shared/ListHeader'

export default {
  components: {
    Task,
    ListHeader,
  },
  props: ["tasksTodo"],
  computed: {
    ...mapGetters('settings', ['settings'])
  }
};
</script>
