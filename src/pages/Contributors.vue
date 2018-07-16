<template>
  <div>
    <section class="hero is-primary" v-if="response">
      <div class="hero-body">
        <div class="container text-container">
          <h1 class="title">
            Contributors
          </h1>
          The people who make Switchblade possible
        </div>
      </div>
    </section>
    <section class="section role-section">
      <div class="container" v-if="response">
        <section v-for="role in response" v-bind:key="role.roleId" class="section has-text-centered">
          <h1 class="title is-spaced">{{role.roleName}}</h1>
          <div class="columns is-multiline is-centered">
            <div class="column is-2 has-text-centered" v-for="contributor in role.people" v-bind:key="contributor.user.id">
              <figure>
                <img :src="`https://cdn.discordapp.com/avatars/${contributor.user.id}/${contributor.user.avatar}.jpg`" class="round is-unselectable">
              </figure>
              <span class="contributor-name">{{contributor.user.username}}#{{contributor.user.discriminator}}</span>
            </div>
          </div>
        </section>
      </div>
    </section>
    <b-loading :active="!response" />
  </div>
</template>

<script>
import snekfetch from 'snekfetch'

export default {
  name: 'Contributors',
  metaInfo: {
    title: 'Contributors'
  },
  data: () => {
    return {
      response: null
    }
  },
  mounted: function () {
    snekfetch.get(`${process.env.BLADEY_API_ROOT}/contributors`).then(({body}) => {
      this.response = body
    })
  }
}
</script>

<style scoped>
.hero-body > .container > .title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
  color: white;
}

.role-section .title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 40px;
  color: white;
}

.contributor-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: white;
  word-wrap: break-word;
}
</style>
