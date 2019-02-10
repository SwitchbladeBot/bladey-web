<template>
  <div>
    <section v-if="loaded">
      <b-field label="Prefix">
        <b-input v-model="prefix" @input="saveSnackbar" maxlength="50" />
      </b-field>
      <b-field label="Language">
        <b-autocomplete
          v-model="languageText"
          :data="filteredDataObj"
          @select="setLanguage">
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>
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
    language: null,
    languages: null,
    languageText: null,
    prefix: null,
    snackbar: false
  }),
  computed: {
    filteredDataObj () {
      return this.languages ? this.languages.filter(o => o.toString().toLowerCase().indexOf(this.languageText) >= 0) : []
    }
  },
  mounted () {
    this.$api.guildConfiguration(this.guild.id)
      .then(({ language, prefix, availableLanguages }) => {
        this.language = this.languageText = language
        this.prefix = prefix
        this.languages = availableLanguages
      })
      .catch(e => this.errorToast())
      .finally(() => {
        this.loaded = true
      })
  },
  methods: {
    saveSnackbar () {
      if (this.snackbar) return
      this.snackbar = true
      this.$snackbar.open({
        message: 'You have unsaved changes!',
        position: 'is-top',
        actionText: 'Save',
        duration: 10000,
        onAction: () => this.save()
      })
    },
    save () {
      const { language, prefix } = this
      this.$api.saveGuildConfiguration(this.guild.id, { language, prefix })
        .then(() => {
          this.$toast.open({
            message: 'Guild configuration saved!',
            type: 'is-success'
          })
        })
        .catch(e => this.errorToast())
        .finally(() => {
          this.snackbar = false
        })
    },
    errorToast () {
      this.$toast.open({
        message: 'An error occured!',
        type: 'is-danger'
      })
    },
    setLanguage (option) {
      console.log('a')
      this.language = option
      this.saveSnackbar()
    }
  }
}
</script>
