<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No more todos left. Add more :)
    <template v-slot:action>
      <q-btn
        flat
        color="primary"
        label="Add Todo"
        @click="$root.$emit('showAddTask')"
      />
    </template>
  </q-banner>
</template>

<script>
export default {};
</script>

<style>
</style>