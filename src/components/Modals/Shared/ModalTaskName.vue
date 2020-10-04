<template>
  <q-input
    outlined
    :value="name"
    @input="$emit('update:name', $event)"
    label="Task Name"
    autofocus
    clearable
    class="q-mb-sm"
    :rules="[(val) => (val && val.length > 0) || 'Enter a todo!']"
  />
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style>
</style>