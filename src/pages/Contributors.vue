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
    <div class="container" v-if="response">
      <section v-for="role in response" v-bind:key="role.roleId" class="role-section has-text-centered">
        <h1>{{role.roleName}}</h1>
        <div class="columns is-multiline">
          <div class="column is-2 has-text-centered" v-for="contributor in role.people" v-bind:key="contributor.user.id">
            <figure>
              <img :src="`https://cdn.discordapp.com/avatars/${contributor.user.id}/${contributor.user.avatar}.jpg`" alt="" class="round is-">
            </figure>
            <p class="contributor-name">{{contributor.user.username}}#{{contributor.user.discriminator}}</p>
          </div>
        </div>
      </section>
    </div>
    <b-loading is-full-page="false" :active="!response"></b-loading>
  </div>
</template>

<script>
import snekfetch from 'snekfetch'

export default {
  name: 'Contributors',
  data: () => {
    return {
      response: null
    }
  },
  mounted: function () {
    console.log('Antes do request:')
    console.log(this)
    snekfetch.get(`${process.env.BLADEY_API_ROOT}/contributors`).then(({body}) => {
      this.response = body
    })
  }
}
</script>

<style scoped>
.hero-body > .container > h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
  color: white;
}

.role-section > h1 {
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
}
</style>
