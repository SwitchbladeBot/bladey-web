<template>
  <a>Hey!</a>
</template>

<script>
export default {
  name: 'LoginAuth',
  mounted () {
    this.login('token here') // this.$route.hash
  },
  methods: {
    login (token) {
      opener.onLogin(token)
      window.close()
    }
  }
}
</script>

<style scoped>
</style>
