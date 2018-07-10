<template>
  <a>{{ params }}</a>
</template>

<script>
export default {
  name: 'LoginCallback',
  created () {
    this.$session.start()
    this.$session.set('jwt', 'token here') // this.$route.hash
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
