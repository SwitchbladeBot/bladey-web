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
        await this.$api.login(this.$route.query.code).then(token => {
          this.$localStorage.set('token', token)
        }).catch(e => opener && opener.window ? opener.window.console.error(e) : console.error(e))
        if (opener) opener.location.reload()
      }
      window.close()
    }
  }
}
</script>
