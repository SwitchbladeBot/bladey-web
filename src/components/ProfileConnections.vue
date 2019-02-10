<template>
  <section>
    <b-field label="LastFM" horizontal addons>
      <b-input v-model="lastfm" icon="account-check" expanded disabled />
      <p class="control">
        <button class="button is-danger">Disconnect</button>
      </p>
    </b-field>
  </section>
</template>

<script>
export default {
  name: 'ProfileConnections',
  data: () => ({ lastfm: 'Connected with blbalbal' }),
  async mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
