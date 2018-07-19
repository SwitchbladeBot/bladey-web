<template>
  <router-link :to="`/dashboard/${guild.id}`" class="guild-icon">
    <b-tooltip :label="guild.name" position="is-bottom">
      <figure v-if="guild.icon" :class="`image is-${size}x${size} guild-image`">
        <img :src="guild.iconURL" class="round is-unselectable">
      </figure>
      <div v-else class="guild-placeholder round is-flex is-vcentered">
        {{guild.nameAcronym}}
      </div>
    </b-tooltip>
  </router-link>
</template>

<script>
export default {
  props: {
    guild: Object,
    tooltip: { type: Boolean, default: true },
    size: { type: Number, default: 96 }
  }
}
</script>

<style scoped>
.is-vcentered {
  justify-content: center;
  align-items: center;
}

.guild-icon { color: white; }
.guild-icon .guild-image {
  margin: auto;
  margin-bottom: 0.5rem;
}
.guild-icon .guild-placeholder {
  width: 96px;
  height: 96px;
  background-color: #2C2F33;
  font-weight: 500;
  font-size: 20px;
  word-wrap: break-word;
}
</style>
