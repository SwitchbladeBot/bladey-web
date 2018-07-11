<template>
  <div class="container">
    <section class="hero is-fullheight is-vcentered info">
      <div class="container is-centered">
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
  metaInfo: {
    title: '404'
  }
}
</script>

<style scoped>
  .is-vcentered {
    justify-content: center;
  }
  .is-centered {
    text-align: center;
  }

  .info {
    margin-top: -52px;
  }

  .info .container > .title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: 150px;
    color: white;
  }

  .info .container > .subtitle {
    font-size: 50px;
    color: white;
  }
</style>
