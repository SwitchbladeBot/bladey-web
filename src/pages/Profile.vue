<template>
  <div class="profile-container">
    <UserHero :user="discord.user" />
    <div class="section container profile-horizontal">
      <aside class="menu sidebar">
        <p class="menu-label">
          Profile
        </p>
        <ul class="menu-list">
          <li><a>Social</a></li>
          <li><a>Connections</a></li>
        </ul>
      </aside>
      <section class="profile-main">
        <h1 class="title is-spaced has-text-centered">Social</h1>
        <section>
          <b-field horizontal label="Personal text">
            <b-input v-model="personalText" type="textarea" maxlength="150"></b-input>
          </b-field>
          <b-field horizontal label="Favorite color">
            <swatches v-model="favColor" :exceptions="['']" show-fallback></swatches>
          </b-field>
        </section>
      </section>
    </div>
    <b-loading :active="discord.logging" />
  </div>
</template>

<script>
import UserHero from '../components/UserHero'
import Swatches from 'vue-swatches'

export default {
  name: 'Profile',
  head: { title: { inner: 'Profile' } },
  components: { Swatches, UserHero },
  data () {
    return {
      discord: this.$api.state,
      personalText: 'vem de zap bebe',
      favColor: '#fff'
    }
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.profile-horizontal {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.sidebar {
  flex-shrink: 0;
}

.profile-main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
