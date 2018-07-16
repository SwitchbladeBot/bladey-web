<template>
  <footer class="footer has-text-white">
  <div class="content has-text-centered">
    <p>
    Made with <b-icon class="heart" icon="heart" custom-size="mdi-18px" /> by <router-link to="/contributors">a lot of people</router-link>.
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
.heart:hover {
  color: #ff3860;
}
</style>
