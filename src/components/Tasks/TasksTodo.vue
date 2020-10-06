<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <list-header bgColor="bg-red-4">Tasks Todo</list-header>
      <q-list bordered separator>
        <task
          v-for="(task, key) in tasksTodo"
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
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/shared/ListHeader.vue").default,
  },
};
</script>

<style scoped>
</style>