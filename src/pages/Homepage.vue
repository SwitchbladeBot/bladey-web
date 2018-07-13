<template>
  <div class="container">
    <section class="section introduction">
      <div class="container has-text-centered">
        <img src="../assets/logo.svg" class="logo" width="128" height="128">
        <h1 class="title is-centered has-text-white">The last bot you'll ever need.</h1>
        <div class="buttons is-centered">
          <a class="button is-large is-link is-rounded" href="http://support.switchblade.xyz/" target="_blank">
            <span class="icon">
              <fai class="fab" icon="life-ring" />
            </span>
            <span>Join our support server</span>
          </a>
          <a class="button is-large is-rounded" href="http://invite.switchblade.xyz/" target="_blank">
            <span class="icon">
              <fai class="fab" icon="envelope" />
            </span>
            <span>Invite to your server</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  name: 'Homepage',
  metaInfo: {
    title: 'Homepage'
  },
  components: {
    'Card': Card
  }
}
</script>

<style scoped>
.is-centered {
  text-align: center;
}

.logo {
  padding-bottom: 10px;
}
</style>
