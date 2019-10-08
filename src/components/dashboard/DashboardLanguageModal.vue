<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-select v-model="moduleValues.language" :expanded="true">
        <option
          v-for="lang in languages"
          :value="lang.key"
          :key="lang.key"
          class="dashboard-option">
            {{ lang.displayName }}
        </option>
      </b-select>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="this.saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
    <b-loading :active="!loaded" :is-full-page="false" />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardLanguageModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data () {
    return {
      loaded: false,
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values)),
      languages: []
    }
  },
  computed: {
    changed () {
      return !_.isEqual(this.moduleValues, this.module.values)
    }
  },
  methods: {
    save () {
      this.saving = true
      this.saveCallback(this.module, this.moduleValues)
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
