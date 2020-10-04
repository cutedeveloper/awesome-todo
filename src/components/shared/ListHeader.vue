<template>
  <q-banner
    inline-actions
    :class="bgColor"
    class="banner text-white text-center text-weight-bold"
  >
  <slot></slot>
  </q-banner>
</template>

<script>
export default {
    props: ['bgColor']
};
</script>

<style>
.banner {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>