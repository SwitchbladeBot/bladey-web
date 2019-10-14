<template>
  <div class="command-modal modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-autocomplete
          v-model="commandInput"
          placeholder="Select a command"
          field="name"
          :loading="fetchingCommand"
          :icon="commandSelected ? categoryIcon(commandSelected) : 'magnify'"
          :data="filteredCommands"
          @select="selectCommand">
          <template slot-scope="props">
            <b-icon :icon="categoryIcon(props.option)" size="is-small" />
            {{ props.option.name }}
            <small v-if="props.option.category !== 'all'" class="command-category-tag">{{ props.option.category }}</small>
          </template>
          <template slot="empty">No results for {{ commandInput }}</template>
        </b-autocomplete>
      </b-field>
      <hr>
      <CommandToggleInput
        :command="commandSelected"
        :guild="guild"
        icon="plus"
        :module="module"
        :list="whitelist"
        :categoryIcon="categoryIcon"
        :selectCondition="listCheck">
          <template slot="label">
            Whitelist
            <p><small>This command can only be used in these channels/categories by these users/roles.</small></p>
          </template>
      </CommandToggleInput>
      <CommandToggleInput
        :command="commandSelected"
        :guild="guild"
        icon="minus"
        :module="module"
        :list="blacklist"
        :categoryIcon="categoryIcon"
        :selectCondition="listCheck">
          <template slot="label">
            Blacklist
          <p><small>This command can't be used in these channels/categories or by these users/roles.</small></p>
          </template>
      </CommandToggleInput>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="this.saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'
import CommandToggleInput from './commands/CommandToggleInput'

export default {
  name: 'DashboardCommandsModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  components: { CommandToggleInput },
  data () {
    return {
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values)),
      whitelist: [],
      blacklist: [],
      // Command
      commandInput: '',
      commandSelected: null,
      fetchingCommand: false
    }
  },
  computed: {
    changed () {
      return this.commandSelected ? !_.isEqual(this.parseSave(), {
        whitelist: this.commandSelected.whitelist,
        blacklist: this.commandSelected.blacklist
      }) : false
    },
    filteredCommands () {
      return this.module.input.commands.filter(this.filter(this.commandInput))
    }
  },
  methods: {
    async save () {
      if (!this.commandSelected) return

      this.saving = true
      await this.$api.moduleMethod(this.guild.id, this.module.name, 'saveCommand', {
        cmd: this.commandSelected.category === 'all' ? 'all' : this.commandSelected.name,
        values: { whitelist: this.whitelist, blacklist: this.blacklist }
      })
      this.saveCallback(this.module, null, true)
      this.saving = false
    },
    parseSave () {
      const filter = (o) => !o.missing
      return {
        whitelist: this.whitelist.filter(filter),
        blacklist: this.blacklist.filter(filter)
      }
    },
    filter (text) {
      const t = text.toLowerCase()
      return c => (
        c.name.toLowerCase().includes(t) ||
        (c.aliases && c.aliases.some(a => a.toLowerCase().includes(t))) ||
        c.category.toLowerCase().includes(t)
      )
    },
    listCheck (candidate) {
      const iE = (v) => _.isEqual(candidate, v)
      return this.whitelist.some(iE) || this.blacklist.some(iE)
    },
    async selectCommand (option) {
      if (!option) {
        this.commandSelected = null
        this.whitelist = []
        this.blacklist = []
        return
      }

      this.fetchingCommand = true
      const cmd = await this.$api.moduleMethod(this.guild.id, this.module.name, 'retrieveCommand', {
        cmd: option.category === 'all' ? 'all' : option.name
      })
      this.commandSelected = { ...option, ...cmd }
      this.whitelist = _.cloneDeep(cmd.whitelist)
      this.blacklist = _.cloneDeep(cmd.blacklist)
      this.fetchingCommand = false
      console.log(this.commandSelected)
    },
    categoryIcon (command = this.commandSelected) {
      switch (command.category) {
        case 'games':
          return 'gamepad-variant'
        case 'bot':
          return 'robot'
        case 'anime':
          return 'brush'
        case 'configuration':
          return 'cogs'
        case 'economy':
          return 'cash'
        case 'images':
          return 'image'
        case 'music':
          return 'headphones'
        case 'moderation':
          return 'gavel'
        case 'nsfw':
          return 'cancel'
        case 'memes':
          return 'thumb-up'
        case 'social':
          return 'account-heart'
        case 'utility':
          return 'wrench'
        case 'general':
          return 'book'
        case 'all':
          return 'asterisk'
      }
    }
  }
}
</script>

<style scoped>
.command-modal .field small {
  font-weight: 400;
}

.command-modal hr {
  background-color: #484B52;
}
</style>

<style>
.command-category-tag {
  color: rgba(255, 255, 255, 0.2);
}
</style>
