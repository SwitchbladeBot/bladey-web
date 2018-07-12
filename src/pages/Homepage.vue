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
        <Card title="Open Source" description="Open Source" prefix="fab" icon="github"> </Card>
        <Card title="Configurable" description="Configurable" prefix="fa" icon="cogs"> </Card>
        <Card title="Multilanguage" description="Multilanguage" prefix="fa" icon="language"> </Card>
      </div>
    </section>
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "Homepage",
  metaInfo: {
    title: "Homepage"
  },
  components: {
    'Card': Card
  }
};
</script>

<style scoped>
.is-centered {
  text-align: center;
}

.introduction .title {
  color: white;
}
</style>
