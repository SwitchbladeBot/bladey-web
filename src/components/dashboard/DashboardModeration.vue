<template>
  <div>
    <b-loading :active="true" />
  </div>
</template>

<script>
export default {
  name: 'DashboardModeration',
  props: [ 'guild' ]
}
</script>
