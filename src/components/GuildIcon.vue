<template>
  <div class="guild-icon">
    <b-tooltip :label="tooltip ? guild.name : ''" position="is-bottom">
      <figure v-if="guild.icon" :class="`image is-${size}x${size} guild-image`">
        <img draggable="false" :src="guild.iconURL" class="round is-unselectable">
      </figure>
      <div v-else :style="placeholderStyle" class="guild-placeholder round is-flex is-vcentered">
        {{guild.nameAcronym}}
      </div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    guild: Object,
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

.guild-icon .guild-image {
  margin: auto;
  margin-bottom: 0.5rem;
}
.guild-icon .guild-placeholder {
  background-color: #2c2f33;
  font-weight: 500;
  word-wrap: break-word;
}
</style>
