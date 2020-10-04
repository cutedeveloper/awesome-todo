<template>
  <q-card>
    <q-form @submit="submitForm()" ref="submitTaskForm">
      <modal-header>Add Task</modal-header>
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />
        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" />
      </q-card-section>
      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false,
      },
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm() {
      this.$refs.submitTaskForm.validate().then((success) => {
        if (success) {
          this.addTask(this.taskToSubmit);
          this.$emit("taskAdded");
        }
      });
    },
  },
  components: {
    "modal-header": require("./Shared/ModelHeader.vue").default,
    "modal-task-name": require("./Shared/ModalTaskName.vue").default,
    "modal-due-date": require("./Shared/ModalDueDate.vue").default,
    "modal-due-time": require("./Shared/ModalDueTime.vue").default,
    "modal-buttons": require("./Shared/ModalButtons.vue").default,
  },
};
</script>

<style>
</style>