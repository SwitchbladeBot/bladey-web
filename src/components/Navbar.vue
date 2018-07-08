<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">SWITCHBLADE</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://discordapp.com/api/oauth2/authorize?client_id=445277324175474689&redirect_uri=https%3A%2F%2Fswitchblade.xyz%2FloginCallback&response_type=code&scope=guilds%20identify"><font-awesome-icon icon="sign-in-alt"></font-awesome-icon> Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:900i');

  .navbar-brand {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
</style>
