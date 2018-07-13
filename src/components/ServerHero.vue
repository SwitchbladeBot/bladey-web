<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <!-- In the future, we could add the server icon here -->
        <h1 class="title">
          {{ $route.params.id }}
        </h1>
        <router-link to="/dashboard" class="button is-small is-dark is-rounded">
          Change servers
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
