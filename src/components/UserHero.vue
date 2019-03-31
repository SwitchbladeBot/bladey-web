<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container is-flex">
        <UserIcon :user="user" :size="128" />
        <div class="container text-container">
          <h1 class="title">
            {{ user.username }}
          </h1>
          <h2 class="subtitle">
            #{{ user.discriminator }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserIcon from '../components/UserIcon'

export default {
  props: { user: Object },
  components: { UserIcon }
}
</script>

<style scoped>
.user-icon {
  max-width: 128px;
  margin-right: 2rem;
}
</style>
