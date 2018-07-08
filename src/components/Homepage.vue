<template>
  <div class="header">
    <h1>The last bot you'll ever need</h1>
    <b-button variant="secondary" size="lg" href="http://support.switchblade.xyz/" class="button">Join our support server</b-button>
    <b-button variant="primary" size="lg" href="http://invite.switchblade.xyz/" class="button">Invite to your server</b-button>
  </div>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style scoped>
  h1 {
    font-weight: bold;
    color: white;
  }

  .button {
    margin-top: 10px;
  }

  .header {
    text-align: center;
    padding-top: 1in;
    margin-bottom: 1in;
  }
</style>
