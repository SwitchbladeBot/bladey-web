<template>
  <div class="container">
    <section class="hero is-vcentered info">
      <div class="container has-text-centered">
        <h1 class="title">
          Not yet.
        </h1>
        <div class="video-container">
          <iframe width="100%" height="auto" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&controls=0&showinfo=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ServerSelector',
  head: {
    title: { inner: 'Select a server' }
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

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 25px;
}

.video-container > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.info .container > .title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
  color: white;
}
</style>
