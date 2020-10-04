<template>
  <q-page padding>
    <p>Todo Page</p>
    <search/>
    <no-tasks v-if="!Object.keys(tasksTodo).length"/>
    <tasks-todo v-else :tasksTodo="tasksTodo"></tasks-todo>

    <tasks-completed :tasksCompleted="tasksCompleted"></tasks-completed>
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddDialog = true"
      />
    </div>
    <q-dialog v-model="showAddDialog">
      <add-task @taskAdded="showAddDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
  },
  components: {
    "add-task": require("components/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "search": require("components/Tasks/tools/Search.vue").default,
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddDialog = true
    })
  }
};
</script>

<style scoped>
</style>