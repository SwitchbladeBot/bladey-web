<template>
  <div>
    Hey, listen!
  </div>
</template>

<script>
export default {
  name: 'LoginCallback',
  created () {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>
