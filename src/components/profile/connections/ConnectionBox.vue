<template>
  <div class="connection-box" :style="{ 'background-color': color }">
    <div class="connection-box__header is-flex">
      <img
        alt="Profile icon"
        draggable="false"
        :class="{ 'connection-box__header__account-profile': true, round: data.connected }"
        :src="data.connected ? data.account.avatar : `static/icons/logos/${icon}`" />
      <div class="connection-box__header__account-info">
        <span class="connection-box__header__account-info__account-name">{{ data.connected ? data.account.user : displayName }}</span>
        <br>
        <span v-if="data.connected" class="connection-box__header__account-info__connection-name">{{ displayName }}</span>
      </div>
      <button v-if="!data.connected" class="button is-pulled-right" @click="openConnectWindow(data)">CONNECT</button>
      <button v-else class="button is-pulled-right" @click="disconnect(data, displayName)"><b-icon icon="close"></b-icon></button>
    </div>
    <div v-if="data.connected" class="connection-box__content">
      <slot class="connection-box__content__config"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionBox',
  props: ['color', 'displayName', 'connected', 'icon', 'data'],
  methods: {
    openConnectWindow (data) {
      this.$parent.$parent.openConnectWindow(data)
    },
    disconnect (data, displayName) {
      this.$parent.$parent.disconnect({ ...data, displayName })
    }
  }
}
</script>

<style>
.connection-box {
  border-radius: 5px;
}
.connection-box__header {
  background: rgba(0, 0, 0, .1);
  border-radius: 5px 5px 0px 0px;
  padding: 16px;
  border-bottom: .6px solid rgba(63, 63, 63, .27);
  align-items: center;
}
.connection-box__header__account-profile {
  width: 64px;
  height: 64px;
}
.connection-box__header__account-info {
  padding-left: 20px;
  line-height: 19px;
}
.connection-box__header__account-info__account-name {
  font-size: 20px;
  font-weight: 600;
}
.connection-box__header__account-info__connection-name {
  font-size: 14px;
  color: rgba(255, 255, 255, .6);
}
.connection-box__header > .button {
  font-weight: 600;
  color: white;
  background: rgba(0, 0, 0, .15);
  border: 1px solid rgba(0, 0, 0, .2) !important;
  margin: 14px 14px 14px auto;
}
.connection-box__header > .button:hover {
  background: rgba(0, 0, 0, .5);
  border: 1px solid rgba(0, 0, 0, .1);
}
.connection-box__content {
  padding: 20px 13px 0px;
}
</style>
