<template>
<main>
  <button type="button"> {{ msg }}</button>
</main>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      msg: "hello filter"
    }
  }
}
</script>

<style scoped>

</style>
