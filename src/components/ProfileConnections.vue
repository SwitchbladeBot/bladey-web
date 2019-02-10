<template>
  <section>
    <b-field horizontal label="WHATSAPP">
      <b-input v-model="zap"></b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  name: 'ProfileConnections',
  data: () => ({ zap: 'true' }),
  async mounted () {   
  },
  methods: {}
}
</script>

<style scoped>

</style>
