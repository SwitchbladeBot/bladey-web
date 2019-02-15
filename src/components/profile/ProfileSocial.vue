<template>
  <div>
    <section v-if="loaded">
      <div class="columns">
        <div class="column">
          <b-field label="Personal text">
            <b-input v-model="personalText" @input="saveSnackbar" type="textarea" maxlength="260" />
          </b-field>
        </div>
        <div class="column">
          <b-field label="Favorite color">
            <swatches v-model="favColor" @input="saveSnackbar" :exceptions="['']" show-fallback />
          </b-field>
        </div>
      </div>
    </section>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
import Swatches from 'vue-swatches'

export default {
  name: 'ProfileSocial',
  components: { Swatches },
  data: () => ({
    loaded: false,
    personalText: null,
    favColor: null,
    snackbar: false
  }),
  mounted () {
    this.$api.profile()
      .then(({ personalText, favColor }) => {
        this.personalText = personalText
        this.favColor = favColor || '#7289da'
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
      const { personalText, favColor } = this
      this.$api.saveProfile({ personalText, favColor })
        .then(() => {
          this.$toast.open({
            message: 'Profile saved!',
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
    }
  }
}
</script>
