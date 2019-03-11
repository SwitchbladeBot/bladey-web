<template>
  <div>
    <ConnectionBox
      displayName="Last.fm"
      color="#B90000"
      icon="../../../../assets/lastfm.svg"
      :data="data"
    >
      Scrobbling
      <b-switch class="switch is-pulled-right"></b-switch>
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
