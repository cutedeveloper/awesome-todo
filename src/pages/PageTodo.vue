<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <search />
      <no-tasks v-if="!Object.keys(tasksTodo).length && !search" />
      <q-scroll-area class="q-scroll-area-tasks">
        <tasks-todo
          v-if="Object.keys(tasksTodo).length"
          :tasksTodo="tasksTodo"
        ></tasks-todo>

        <tasks-completed
          v-if="Object.keys(tasksTodo).length"
          :tasksCompleted="tasksCompleted"
          class="q-mb-xl"
        ></tasks-completed>
      </q-scroll-area>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          class="all-pointer-events"
          color="primary"
          size="24px"
          icon="add"
          @click="showAddDialog = true"
        />
      </div>
    </div>
    <q-dialog v-model="showAddDialog">
      <add-task @taskAdded="showAddDialog = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddDialog: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"]),
  },
  components: {
    "add-task": require("components/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    search: require("components/Tasks/tools/Search.vue").default,
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddDialog = true;
    });
  },
};
</script>

<style scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>