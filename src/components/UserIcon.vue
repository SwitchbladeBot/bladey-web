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
    tooltip: { type: Boolean, default: true },
    size: { type: Number, default: 96 },
    fontSize: { type: String, default: null }
  },
  data () {
    return {
      placeholderStyle: `width: ${this.size}px; height: ${this.size}px; font-size: ${this.fontSize || Math.floor(this.size * 0.2)}px`
    }
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
