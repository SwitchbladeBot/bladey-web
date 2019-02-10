<template>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">
        <span>
          <fai :icon="[prefix, icon]" />
        </span>
        <span>{{ title }}</span>
      </p>
      <p class="subtitle">{{ description }}</p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    prefix: String,
    icon: String
  },
  name: 'Card'
}
</script>
