<template>
  <section>
    <b-loading :active="true" />
  </section>
</template>

<script>
export default {
  name: 'LoginAuth',
  head: { title: { inner: 'Authentication' } },
  mounted () {
    this.login()
  },
  methods: {
    async login () {
      if (this.$route.query.code) {
        await this.$api.login(this.$route.query.code).then(token => this.$localStorage.set('token', token))
        opener.location.reload()
      }
      window.close()
    }
  }
}
</script>
