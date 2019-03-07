<template>
  <div>
    <ConnectionBox
      color="#B90000"
      icon="../../assets/logos/lastfm.svg"
      v-bind:account="data.account"
    v-bind:profile="data.account.avatar"/>
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
