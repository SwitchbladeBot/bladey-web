<template>
  <div>
    <ConnectionBox
      displayName="Last.fm"
      color="#B90000"
      icon="lastfm.svg"
      :data="data"
    >
      <div v-if="data.connected">
        <div class="config-element">
          Scrobbling
          <b-switch v-if="data.connected" @input="saveSnackbar" class="is-pulled-right" v-model="data.configuration.scrobbling" ></b-switch>
        </div>
        <div class="config-element">
          Scrobble percentage
          <vue-slider
            class="is-pulled-right slider"
            tooltip="focus"
            :use-keyboard="true"
            width="30%"
            v-model="data.configuration.percent"
            :min="45"
            :max="95"
            :step="1"
            tooltip-formatter="{value}%"
            tooltip-placement="bottom"
            style="padding: 0px 10px 0px 0px;"
            @change="saveSnackbar"
          >
          </vue-slider>
        </div>
      </div>
    </ConnectionBox>
  </div>
</template>

<script>
import ConnectionBox from './ConnectionBox'
import VueSlider from 'vue-slider-component'
import '../../../assets/vue-slider-component.theme.scss'
export default {
  name: 'LastfmConnection',
  props: ['data'],
  components: { ConnectionBox, VueSlider },
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
