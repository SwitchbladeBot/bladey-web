<template>
  <section>
    <div class="">
      <p class="title has-text-centered">
        Connecting your {{service}} account...
      </p>
    </div>
    <b-loading :active="true" />
  </section>
</template>

<script>
export default {
  name: 'ConnectionCallback',
  head: { title: { inner: 'Connecting' } },
  mounted () {
    this.setService()
    this.connect()
  },
  data: () => ({ service: null }),
  methods: {
    setService () {
      this.service = this.$route.params.connection
    },
    async connect () {
      const { success } = this.$api.connectConnection(this.service, this.$route.query)
      if (opener) opener.update(success)
      window.close()
      // if (this.$route.query.code) {
      //   await this.$api.login(this.$route.query.code).then(token => {
      //     this.$localStorage.set('token', token)
      //   }).catch(e => opener && opener.window ? opener.window.console.error(e) : console.error(e))
      //   if (opener) opener.location.reload()
      // }
      // window.close()
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 20px;
  }
</style>
