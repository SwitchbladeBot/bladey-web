<template>
  <div class="contributors">
    <section class="hero is-primary" v-if="roles">
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
      <div class="container" v-if="roles">
        <section v-for="role in roles" v-bind:key="role.roleId" class="section has-text-centered">
          <h1 class="title is-spaced">{{role.name}}</h1>
          <div class="columns is-multiline is-centered">
            <div class="column is-2 has-text-centered" v-for="contributor in role.members" v-bind:key="contributor.id">
              <figure class="image is-128x128 contributor-avatar">
                <img :src="contributor.displayAvatarURL" class="round is-unselectable">
              </figure>
              <span class="contributor-name">{{contributor.tag}}</span>
            </div>
          </div>
        </section>
      </div>
    </section>
    <b-loading :active="!roles" />
  </div>
</template>

<script>
import User from '../oauth/User'

export default {
  name: 'Contributors',
  metaInfo: {
    title: 'Contributors'
  },
  data: () => {
    return {
      roles: null
    }
  },
  mounted: function () {
    fetch(`${process.env.BLADEY_API_ROOT}/contributors`).then(async res => {
      if (res.ok) {
        const json = await res.json()
        this.roles = json.roles.map(r => {
          r.members = r.members.map(c => new User(c))
          return r
        })
      }
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
