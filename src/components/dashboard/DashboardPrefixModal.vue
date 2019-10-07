<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Prefix Module</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field label="Prefix">
        <b-input
          v-model="module.values.prefix"
          :maxlength="module.input.prefix.max"
          placeholder="Guild prefix"
          required>
        </b-input>
      </b-field>
      <b-field label="Ignore spaces after prefix">
        <b-switch
          v-model="module.values.spacePrefix"></b-switch>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" :loading="this.saving" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DashboardPrefixModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data: () => ({ saving: false }),
  methods: {
    save () {
      this.saving = true
      this.saveCallback()
    }
  }
}
</script>

<style scoped>

</style>
