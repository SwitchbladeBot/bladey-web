<template>
  <div class="connection-box" v-bind:style="{ 'background-color': color }">
    <div class="header">
      <!--<img draggable="false" class="service-icon" v-bind:src="icon">-->
      <img draggable="false" class="account-profile" v-bind:src="profile" />
      <a v-bind:href="account.url" class="account-name">{{ account.user }}</a>
    </div>
    <div class="content">
      CONFIG LSDAD
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConnectionBox',
    props: ['color', 'profile', 'icon', 'account']
  }
</script>

<style>
  .connection-box {
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .connection-box > .header {
    background: rgba(0, 0, 0, .15);
    border-radius: 5px 5px 0px 0px;
    padding: 8px;
    border-bottom: .8px solid rgba(0, 0, 0, .27);
    font-size: 0px;
  }
.connection-box > .header > .account-profile {
  width: 60px;
  height: 60px;
  border-radius: 128px;
}
.connection-box > .header > .account-name {
  font-size: 20px;
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}
  .connection-box > .content {
    padding: 13px;
  }
</style>
