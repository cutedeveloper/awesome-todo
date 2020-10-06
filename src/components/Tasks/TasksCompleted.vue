<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <list-header bgColor="q-mt-lg bg-green-4">Tasks Completed</list-header>
      <q-list bordered separator>
        <task
          v-for="(task, key) in tasksCompleted"
          :task="task"
          :id="key"
          :key="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["tasksCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/shared/ListHeader.vue").default,
  },
};
</script>

<style>
</style>