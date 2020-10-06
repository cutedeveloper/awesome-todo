<template>
  <q-item
    :class="task.completed ? 'bg-cyan-2' : 'bg-cyan-1'"
    v-ripple
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-value" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough': task.completed }"
        v-html="$options.filters.highlightSearch(task.name, search)"
      ></q-item-label>
    </q-item-section>
    <q-item-section side top>
      <div class="row">
        <div class="column">
          <q-item-label caption>
            <q-icon name="event" />
            {{ task.dueDate | niceDate }}</q-item-label
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
          @click.stop="showEditTaskModal"
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
      <edit-task @taskUpdated="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
// we import all of `date`
import { date } from "quasar";
// destructuring to keep only what is needed
const { addToDate } = date;

export default {
  computed: {
    ...mapState("tasks", ["search"]),
  },
  data() {
    return {
      showEditTask: false,
    };
  },
  components: {
    "edit-task": require("../Modals/EditTask.vue").default,
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
    showEditTaskModal() {
      this.showEditTask = true;
    },
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "YYYY MMM D");
    },
    highlightSearch(value, search) {
      if (!search) return value;
      return value.replace(
        search,
        '<span class="bg-yellow-6">' + search + "</span>"
      );
    },
  },
};
</script>

<style scoped>
</style>