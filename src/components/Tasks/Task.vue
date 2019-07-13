<template>
  <div>
    <q-item
      @click="updateTask({id: id, updates: { completed: !task.completed }})"
      clickable
      v-ripple
      :class="task.completed ? 'bg-green-1' : 'bg-orange-1' "
    >
      <q-item-section side top>
        <q-checkbox v-model="task.completed" class="no-pointer-events" />
      </q-item-section>

      <q-item-section>
        <q-item-label :class="{ 'text-strikethrough': task.completed}">{{task.name}}</q-item-label>
      </q-item-section>

      <q-item-section side v-if="task.dueDate">
        <div class="row">
          <div class="column" justify-center>
            <q-icon name="event" size="18px" class="q-mr-xs" />
          </div>
          <div class="column">
            <q-item-label class="row justify-end" caption>{{task.dueDate}}</q-item-label>
            <q-item-label class="row justify-end" caption>
              <small>{{task.dueTime}}</small>
            </q-item-label>
          </div>
        </div>
      </q-item-section>

      <q-item-section side>
        <div class="row">
          <q-btn flat round color="primary" dense icon="edit" @click.stop="showEditTask = true" />
          <q-btn flat round color="red" dense icon="delete" @click.stop="promptToDelete(id)" />
        </div>
      </q-item-section>

      <q-dialog v-model="showEditTask">
        <EditTask @close="showEditTask = false" :task="task" :id="id"></EditTask>
      </q-dialog>
    </q-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditTask from '../Modals/EditTask.vue'
export default {
  components: {
    EditTask
  },
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", 'deleteTask']),
    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete this task?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  }
};
</script>

<style>
</style>
