<template>
  <div>
    <section v-if="personalText && favColor">
      <b-field horizontal label="Personal text">
        <b-input v-model="personalText" @input='saveSnackbar' type="textarea" maxlength="260" />
      </b-field>
      <b-field horizontal label="Favorite color">
        <swatches v-model="favColor" @input='saveSnackbar' :exceptions="['']" show-fallback />
      </b-field>
    </section>
    <b-loading :active="!(personalText && favColor)" />
  </div>
</template>

<script>
import Swatches from 'vue-swatches'

export default {
  name: 'ProfileSocial',
  components: { Swatches },
  data: () => ({
    personalText: null,
    favColor: null,
    snackbar: false
  }),
  async mounted () {
    const { personalText, favColor } = await this.$api.profile()
    this.personalText = personalText
    this.favColor = favColor || '#7289da'
  },
  methods: {
    saveSnackbar () {
      if (this.snackbar) return
      this.snackbar = true
      this.$snackbar.open({
        message: 'You have unsaved changes!',
        position: 'is-top',
        actionText: 'Save',
        indefinite: true,
        onAction: () => this.save()
      })
    },
    save () {
      const { personalText, favColor } = this
      this.$api.saveProfile({ personalText, favColor }).then(() => {
        this.$toast.open({
          message: 'Profile saved!',
          type: 'is-success'
        })
      }, e => {
        this.$toast.open({
          message: 'An error occured!',
          type: 'is-danger'
        })
      }).then(() => {
        this.snackbar = false
      })
    }
  }
}
</script>
