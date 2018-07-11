<template>
  <div class="container">
    <section class="section introduction">
      <div class="container">
        <h1 class="title is-centered">
          The last bot you'll ever need.
        </h1>
        <div class="buttons is-centered">
          <a class="button is-large is-link" href="http://support.switchblade.xyz/" target="_blank">
            <span class="icon">
              <fai class="fab" icon="life-ring" />
            </span>
            <span>Join our support server</span>
          </a>
          <a class="button is-large" href="http://invite.switchblade.xyz/" target="_blank">
            <span class="icon">
              <fai class="fab" icon="envelope" />
            </span>
            <span>Invite to your server</span>
          </a>
        </div>
      </div>
    </section>
    <section class="section cards">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-secondary">
          <article class="tile is-child box">
            <p class="title">
              <span>
                <fai icon="code" />
              </span>
              <span>Open Source</span>
            </p>
            <p class="subtitle">Bla</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">
              <span>
                <fai icon="code" />
              </span>
              <span>Open Source</span>
            </p>
            <p class="subtitle">Bla</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">
              <span>
                <fai icon="code" />
              </span>
              <span>Open Source</span>
            </p>
            <p class="subtitle">Bla</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  metaInfo: {
    title: 'Homepage'
  }
}
</script>

<style scoped>
  .is-centered {
    text-align: center;
  }

  .introduction .title {
    color: white;
  }
</style>
