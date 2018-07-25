<template>
  <section class="section guild-section is-centered">
    <GuildIcon v-if="guild" :guild="guild" class="img-border" :tooltip="false" :size="128" />
    <div class="info-card">
      <h1 class="title">
        {{ guild ? guild.name : 'Member Counter' }}
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
import Guild from '../oauth/Guild'

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
  mounted () {
    this.request()
    this.intervalID = setInterval(() => this.request(), 5000)
  },
  destroyed () {
    if (this.intervalID) {
      clearInterval(this.intervalID)
    }
  },
  methods: {
    request () {
      fetch(`${process.env.BLADEY_API_ROOT}/guilds/members/${this.$route.params.id}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
          this.guild = new Guild(res)
          this.num = this.guild.memberCount
        })
        .catch(res => this.$router.push('/'))
    }
  }
}
</script>

<style scoped>
.guild-section .info-card {
  background-color: white;
  max-width: fit-content;
  margin: 0 auto;
  padding: 70px;
  margin-top: -70px;
  border-radius: 20px;
}

.is-centered {
  text-align: center;
}

.subtitle {
  font-size: 80px;
  color: #23272A;
}

.iOdometer  {
  margin-top: -12px !important;
  font-weight: bold;
}

@media only screen and (max-width: 768px) {
  .subtitle {
    font-size: 50px;
  }

  .guild-section div {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
