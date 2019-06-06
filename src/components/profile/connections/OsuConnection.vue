<template>
  <div>
    <ConnectionBox
      displayName="osu!"
      color="#F06EA8"
      icon="osu.svg"
      :data="data"
    >
    </ConnectionBox>
  </div>
</template>

<script>
import ConnectionBox from './ConnectionBox'
export default {
  name: 'OsuConnection',
  props: ['data'],
  components: { ConnectionBox },
  methods: {
    saveSnackbar () {
      this.$parent.saveSnackbar()
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/main.scss";
.config-element {
  padding-bottom: 20px;
}
.slider {
  position: relative;
  top: 10px;
}
.dot {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: $blurple;
  transition: all .3s;
}
.tooltip {
  background: $blurple;
  font-size: 14px;
  white-space: nowrap;
  padding: 2px 5px;
  min-width: 20px;
  text-align: center;
  color: #fff;
}
</style>
