<template>
  <section>
    <div class="">
      <p class="title has-text-centered">
        Connecting to your {{service}} account...
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
    this.connect()
  },
  data () {
    return { service: this.$route.params.connection }
  },
  methods: {
    async connect () {
      const { success } = await this.$api.connectConnection(this.service, this.$route.query)
      const payload = {
        event: 'update',
        success
      }
      if (opener) opener.postMessage(payload)
      window.close()
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 20px;
  }
</style>
