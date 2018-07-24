<template>
  <section class="section guild-section is-centered">
      <GuildIcon :guild="guild" class="img-border" :tooltip="false" :size="512" />
      <div class="">
        <h1 class="title">
          {{ guild.name }}
        </h1>
        <h2 class="subtitle">
          <i class="mdi mdi-account"></i>
          <IOdometer
            class="iOdometer"
            :value="num"
          />
        </h2>
      </div>
    <b-loading :active="!guild" />
  </section>
</template>

<script>
import GuildIcon from '../components/GuildIcon'
import IOdometer from 'vue-odometer'
import 'odometer/themes/odometer-theme-default.css'

export default {
  name: 'Members',
  head: {
    title: { inner: 'Guild Members' }
  },
  components: { GuildIcon, IOdometer },
  data () {
    return {
      guild: null,
      num: 0
    }
  },
  mounted: function () {
    const that = this
    function request () {
      fetch(`${process.env.BLADEY_API_ROOT}/guilds/members/${that.$route.params.id}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
          that.guild = res
        })
    }
    setInterval(async function () {
      await request()
      that.num = that.guild.members
    }, 1000)
  }
}
</script>

<style scoped>
.guild-section div {
  background-color: white;
  max-width:fit-content;
  margin: 0 auto;
  padding: 70px;
  border-radius: 20px;
  margin-top: -70px;
}

.is-centered {
  text-align: center;
}

.logo {
  padding-bottom: 10px;
}
</style>
