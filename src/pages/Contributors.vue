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
      <div v-if="roles" class="container">
        <section v-for="role in roles" v-bind:key="role.roleId" class="section has-text-centered">
          <h1 class="title is-spaced">{{role.name}}</h1>
          <div class="columns is-multiline is-centered">
            <div class="column is-2 has-text-centered" v-for="contributor in role.members" v-bind:key="contributor.id">
              <figure class="image is-128x128 contributor-avatar">
                <img draggable="false" :src="contributor.displayAvatarURL" class="round is-unselectable">
                <div class="round is-unselectable status">
                  <img draggable="false" class="is-unselectable status-svg" :src="`static/icons/status-${contributor.status}.svg`">
                </div>
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
export default {
  name: 'Contributors',
  head: { title: { inner: 'Contributors' } },
  data: () => ({ roles: null }),
  mounted: async function () {
    this.roles = await this.$api.contributors()
  }
}
</script>

<style scoped>
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

.contributor-avatar,
.contributor-avatar img:not(.status-svg) {
  position: relative;
  top: 0;
  left: 0;
}

.status-svg {
  height: 28px;
  width: 28px;
  left: 2px;
  top: 2px;
  position: relative;
}

.contributor-avatar .status {
  box-shadow: 0 0 0 3pt #18191c;
  background-color: #18191c;
  position: relative;
  bottom: 32px;
  left: calc(100% - 32px);
  width: 32px;
  height: 32px;
}
</style>
