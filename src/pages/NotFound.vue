<template>
  <div class="container">
    <section class="hero is-vcentered info">
      <div class="container has-text-centered">
        <h1 class="title">
          404
        </h1>
        <h2 class="subtitle">
          Not found
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  head: { title: { inner: '404' } }
}
</script>

<style scoped>
.title {
  font-weight: 900;
  font-style: italic;
  font-size: 150px;
}

.subtitle {
  font-size: 50px;
}
</style>
