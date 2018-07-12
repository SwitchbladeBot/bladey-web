<template>
  <ServerHero title="Test"/>
</template>

<script>
import ServerHero from '../components/ServerHero.vue'

export default {
  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard'
  },
  components: { ServerHero },
  data () {
    return {
      id: this.$router.params.id
    }
  }
}
</script>

<style scoped>

</style>
