<template>
  <footer class="footer has-text-white">
  <div class="content has-text-centered">
    <p>
    Made with <b-icon class="heart" icon="heart" custom-size="mdi-18px" /> by <router-link class="colorFade" to="/contributors">a lot of people</router-link>.
    </p>
  </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.heart {
  transition: color 0.25s ease;
}
.heart:hover {
  color: #ff3860;
}

.colorFade {
  -webkit-transition: 0.25s color ease-out;
  -moz-transition: 0.25s color ease-out;
  transition: 0.25s color ease-out;
}
</style>
