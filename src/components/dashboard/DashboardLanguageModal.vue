<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Language Module</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field label="Language">
        <b-select v-model="module.values.language">
          <option
            v-for="lang in languages"
            :value="lang.key"
            :key="lang.key"
            class="dashboard-option">
            {{ lang.displayName }}
          </option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" :loading="this.saving" @click="save()">Save</b-button>
    </footer>
    <b-loading :active="!loaded" />
  </div>
</template>

<script>
export default {
  name: 'DashboardLanguageModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data: () => ({
    loaded: false,
    saving: false,
    languages: []
  }),
  methods: {
    save () {
      this.saving = true
      this.saveCallback()
    }
  },
  mounted () {
    this.$api.locales(navigator.language || navigator.userLanguage).then(({ languages }) => {
      this.languages = languages
      this.loaded = true
    }).catch(e => this.errorToast())
  }
}
</script>

<style scoped>
.dashboard-option {
  color: #fff;
  background-color: #484B52;
}
</style>
