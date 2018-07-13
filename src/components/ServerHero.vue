<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-flex">
        <div class="container image-container">
          <img class="round" :src="guild.iconURL">
        </div>
        <div class="container text-container">
          <h1 class="title">
            {{ guild.name }}
          </h1>
          <router-link to="/dashboard" class="button is-small is-dark is-rounded">
            Change servers
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    guild: Object,
    user: Object
  }
}
</script>

<style scoped>
.image-container {
  max-width: 128px;
  margin-right: 1rem;
}

.image-container > img {
  box-shadow: 0px 0px 10px black;
}
</style>
