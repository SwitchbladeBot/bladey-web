<template>
  <div>
    <ConnectionBox
      displayName="Last.fm"
      color="#B90000"
      icon="lastfm.svg"
      :data="data"
    >
      Scrobbling
      <b-switch v-if="data.connected" class="switch is-pulled-right" v-model="data.configuration.scrobbling" ></b-switch>
    </ConnectionBox>
  </div>
</template>

<script>
import ConnectionBox from './ConnectionBox'
export default {
  name: 'LastfmConnection',
  props: ['data'],
  components: { ConnectionBox }
}
</script>
