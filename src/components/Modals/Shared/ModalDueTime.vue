<template>
  <q-input outlined :value="dueTime" label="Due time" @input="$emit('update:dueTime', $event)">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time :value="dueTime" @input="$emit('update:dueTime', $event)">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ["dueTime"],
};
</script>

<style>
</style>