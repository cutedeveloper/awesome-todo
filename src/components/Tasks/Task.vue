<template>
  <q-item
    :class="task.completed ? 'bg-cyan-2' : 'bg-cyan-1'"
    v-ripple
    clickable
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-value" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.completed }">{{
        task.name
      }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <div class="row">
        <div class="column">
          <q-item-label caption>
            <q-icon name="event" />
            {{ task.dueDate }}</q-item-label
          >
          <q-item-label caption>
            <q-icon name="alarm" />
            <small>{{ task.dueTime }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section>
    <q-item-section side top>
      <div class="row">
        <q-btn
          flat
          round
          color="primary"
          icon="edit"
          @click.stop="showEditTask = true"
        />
        <q-btn
          flat
          round
          color="red"
          icon="delete"
          @click.stop="confirmToDelete(id)"
        />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task @taskUpdated="showEditTask = false" :task='task' :id='id'/>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showEditTask: false,
    };
  },
  components: {
      'edit-task': require('../Modals/EditTask.vue').default
  },
  props: ["task", "id"],
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    confirmToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
  },
};
</script>

<style scoped>
</style>