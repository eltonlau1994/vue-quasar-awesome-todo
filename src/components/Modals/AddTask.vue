<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn flat dense round icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="taskToSubmit.name"
            label="Task name"
            class="col"
            autofocus
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            clearable
          />
        </div>
        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="taskToSubmit.dueDate"
            label="Due date"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="taskToSubmit.dueDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="taskToSubmit.dueTime" label="Due time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
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
    onSubmit() {
      console.log("onSubmit");
      this.$refs.name.validate()
      if (!this.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask(){
      console.log("submit form");
      this.addTask(this.taskToSubmit)
      this.$emit('close') //close modal
    }
  }
};
</script>
