<template>
  <div>
    <section v-if="loaded">
      <div class="columns">
        <div class="column is-narrow">
          <b-field label="Prefix">
            <b-input v-model="prefix" @input="saveSnackbar" maxlength="50" />
          </b-field>
        </div>
        <div class="column is-narrow">
          <b-field label="Language">
            <b-select v-model="language" @input="saveSnackbar">
              <option
                v-for="lang in languages"
                :value="lang.key"
                :key="lang.key"
                class="dashboard-option">
                {{ lang.displayName }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
export default {
  name: 'DashboardGeneral',
  props: [ 'guild' ],
  data: () => ({
    loaded: false,
    snackbar: false,
    language: null,
    languages: null,
    prefix: null
  }),
  mounted () {
    Promise.all([
      this.$api.locales(navigator.language || navigator.userLanguage).then(({ languages }) => {
        this.languages = languages
      }),
      this.$api.guildConfiguration(this.guild.id).then(({ language, prefix }) => {
        this.language = this.languageText = language
        this.prefix = prefix
      })
    ]).catch(e => this.errorToast())
      .then(() => { this.loaded = true })
  },
  methods: {
    saveSnackbar () {
      if (this.snackbar) return
      this.snackbar = true
      const snackbar = this.$snackbar.open({
        message: 'You have unsaved changes!',
        position: 'is-top',
        actionText: 'Save',
        duration: 10000,
        onAction: () => this.save()
      })

      const self = this
      snackbar.realClose = snackbar.close
      snackbar.close = function (...args) {
        self.snackbar = false
        this.realClose(...args)
      }
    },
    save () {
      const { language, prefix } = this
      this.$api.saveGuildConfiguration(this.guild.id, { language, prefix })
        .then(() => {
          this.$toast.open({
            message: 'Server configuration saved!',
            type: 'is-success'
          })
        })
        .catch(e => this.errorToast())
    },
    errorToast () {
      this.$toast.open({
        message: 'An error occured!',
        type: 'is-danger'
      })
    },
    setLanguage (option) {
      this.language = option
      this.saveSnackbar()
    }
  }
}
</script>

<style scoped>
.dashboard-option {
  color: #fff;
  background-color: #484B52;
}
</style>
