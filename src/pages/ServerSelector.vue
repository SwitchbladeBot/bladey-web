<template>
  <div class="container">
    <section class="hero is-vcentered info">
      <div class="container has-text-centered">
        <h1 class="title">
          Not yet.
        </h1>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&controls=0&showinfo=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ServerSelector',
  metaInfo: {
    title: 'Select a server'
  },
  data () {
    return {
      requiresAuth: true
    }
  },
  methods: {
    onFailed () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.is-vcentered {
  justify-content: center;
}

.info .container > .title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
  color: white;
}
</style>
