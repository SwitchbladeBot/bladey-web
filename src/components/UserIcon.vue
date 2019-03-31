<template>
  <div class="user-icon">
    <figure :class="`image is-${size}x${size} user-image`">
      <img draggable="false" :src="user.displayAvatarURL" class="round is-unselectable">
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    size: { type: Number, default: 96 }
  }
}
</script>

<style scoped>
.is-vcentered {
  justify-content: center;
  align-items: center;
}

.user-icon .user-image {
  margin: auto;
  margin-bottom: 0.5rem;
}
</style>
