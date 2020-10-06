<template>
  <q-input
    outlined
    :value="name"
    @input="$emit('update:name', $event)"
    label="Task Name"
    v-select-all
    autofocus
    clearable
    class="q-mb-sm"
    :rules="[(val) => (val && val.length > 0) || 'Enter a todo!']"
  />
</template>

<script>
import { selectAll } from "src/directives/select-all";
export default {
  props: ["name"],
  directives: {
    selectAll,
  },
};
</script>

<style>
</style>