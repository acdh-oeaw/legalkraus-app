<template  @click="$emit('click', $event)">
<span>
<slot></slot>
</span>
</template>

<script>
export default {
  name: "EntitySpan",
}
</script>