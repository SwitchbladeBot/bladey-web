<template>
  <div class="profile-container">
    <div v-if="discord.user">
      <UserHero :user="discord.user" />
      <div class="section container profile-horizontal">
        <aside class="menu sidebar">
          <p class="menu-label">
            Profile
          </p>
          <ul class="menu-list">
            <li v-for="cat in categories" v-bind:key="cat" v-on:click="currentCat = cat">
              <a v-bind:class="[{ 'is-active': currentCat === cat }]">{{ cat }}</a>
            </li>
          </ul>
        </aside>
        <section class="profile-main">
          <h1 class="title is-spaced has-text-centered">{{ currentCat }}</h1>
          <component v-bind:is="currentCategoryComponent" />
        </section>
      </div>
    </div>
    <b-loading :active="discord.logging" />
  </div>
</template>

<script>
import UserHero from '../components/UserHero'
import ProfileSocial from '../components/ProfileSocial'
import ProfileConnections from '../components/ProfileConnections'

export default {
  name: 'Profile',
  head: { title: { inner: 'Profile' } },
  components: { ProfileSocial, ProfileConnections, UserHero },
  data () {
    return {
      discord: this.$api.state,
      categories: [ 'Social', 'Connections' ],
      currentCat: 'Social'
    }
  },
  computed: {
    currentCategoryComponent () { return `Profile${this.currentCat}` }
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
