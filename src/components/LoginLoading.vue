<template>
    <h1>{{params}}</h1>
</template>

<script>
export default {
  name: 'LoginLoading',
  data () {
    return {
      params: this.$route.params
    }
  }
}
</script>

<style scoped>

</style>
