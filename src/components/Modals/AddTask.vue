<template>
  <q-card>
    <modal-header>Add Task</modal-header>


    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section>
        <modal-task-name ref="modalTaskName" :name.sync="taskToSubmit.name"></modal-task-name>
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />
        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" />
      </q-card-section>
      <modal-button />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
import ModalHeader from "./Shared/ModalHeader.vue"
import ModalTaskName from "./Shared/ModalTaskName.vue"
import ModalDueDate from "./Shared/ModalDueDate.vue"
import ModalDueTime from "./Shared/ModalDueTime.vue"
import ModalButton from "./Shared/ModalButton.vue"

export default {
  mixins: [mixinAddEditTask],
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButton
  },
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitTask(){
      console.log("submit form");
      this.addTask(this.taskToSubmit)
      this.$emit('close') //close modal
    }
  }
};
</script>
