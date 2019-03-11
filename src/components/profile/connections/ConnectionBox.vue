<template>
  <div class="connection-box" :style="{ 'background-color': color }">
    <div class="header">
      <img draggable="false" class="account-profile" :src="data.connected ? data.account.avatar : icon" />
      <span class="account-name">{{ data.connected ? data.account.user : displayName }}</span>
      <button v-if="!data.connected" class="button is-pulled-right" @click="openConnectWindow(data.name)">CONNECT</button>
    </div>
    <div v-if="data.connected" class="content">
      <slot class="config"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionBox',
  props: ['color', 'displayName', 'connected', 'icon', 'data'],
  methods: {
    openConnectWindow (connection) {
      this.$api.openConnectionPopup(connection)
    }
  }
}
</script>

<style>
  .connection-box {
    border-radius: 5px;
  }
  .connection-box > .header {
    background: rgba(0, 0, 0, .15);
    border-radius: 5px 5px 0px 0px;
    padding: 16px;
    border-bottom: .8px solid rgba(0, 0, 0, .27);
    align-items: center;
    font-size: 0px;
  }
  .connection-box > .header > .account-profile {
    width: 64px;
    height: 64px;
    border-radius: 128px;
  }
  .connection-box > .header > .account-name {
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    padding: 17px;
  }
  .connection-box > .header > .button {
    margin: 14px;
    color: white;
    background: rgba(0, 0, 0, .15);
    border: 1px solid rgba(0, 0, 0, .2);
  }
  .connection-box > .header > .button:hover {
    background: rgba(0, 0, 0, .5);
    border: 1px solid rgba(0, 0, 0, .1);
  }
  .connection-box > .content {
    padding: 13px;
  }
  .connection-box > .content > .config > .switch {
    background: rgba(0, 0, 0, .10);
  }
</style>
