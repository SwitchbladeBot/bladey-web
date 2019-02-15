<template>
  <section>
    <b-field horizontal label="last.fm">
      <b-input v-model="lastfm" icon="account-check" disabled />
      <a class="control">
        <button class="button is-danger">Disconnect</button>
      </a>
    </b-field>
  </section>
</template>

<script>
export default {
  name: 'ProfileConnections',
  data: () => ({ lastfm: 'Connected with WIP' }),
  async mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
