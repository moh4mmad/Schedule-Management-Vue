<template>
  <div>
    <notifications position="top center" group="notify" />
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
