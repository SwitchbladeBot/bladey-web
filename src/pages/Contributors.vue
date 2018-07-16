<template>
  <div class="contributors">
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
              <figure class="image is-128x128 contributor-avatar">
                <img :src="contributor.user.displayAvatarURL" class="round is-unselectable">
              </figure>
              <span class="contributor-name">{{contributor.user.tag}}</span>
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
import User from '../oauth/User'

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
      this.response = body.map(r => {
        r.people = r.people.map(c => {
          c.user = new User(c.user)
          return c
        })
        return r
      })
    })
  }
}
</script>

<style scoped>
.contributors {
  font-family: 'Montserrat', sans-serif;
  color: white;
}

.contributors .title {
  color: white;
}

.hero-body > .container > .title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
}

.role-section .title {
  font-size: 40px;
}

.contributor-name {
  font-weight: 500;
  word-wrap: break-word;
}

.contributor-avatar {
  margin: auto;
  margin-bottom: 0.5rem;
}
</style>
