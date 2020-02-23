<template>
  <div class="command-modal modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ module.displayName }}</p>
      <button class="delete" aria-label="close" @click="$parent.close()"></button>
    </header>
    <section class="modal-card-body">
      <div class="columns">
        <transition name="fade">
        <div v-show="!emptyMenu" class="column is-narrow is-hidden-mobile menu-column">
          <b-menu>
            <b-menu-list v-if="allRule" label="General rules">
              <b-menu-item
                :active="isSelected(allRule)"
                :key="allRule.name"
                :icon="categoryIcon(allRule)"
                :label="allRule.name"
                :disabled="saving"
                @click="menuSelect(allRule)"
              />
            </b-menu-list>
            <b-menu-list v-if="categoriesRules.length !== 0" label="Category rules">
              <b-menu-item
                v-for="category in categoriesRules"
                :active="isSelected(category)"
                :key="category.parsedName"
                :icon="categoryIcon(category)"
                :label="category.name"
                :disabled="saving"
                @click="menuSelect(category)"
              />
            </b-menu-list>
            <b-menu-list v-if="commandsRules.length !== 0" label="Command rules">
              <b-menu-item
                v-for="command in commandsRules"
                :active="isSelected(command)"
                :key="command.parsedName"
                :icon="categoryIcon(command)"
                :label="command.name"
                :disabled="saving"
                @click="menuSelect(command)"
              />
            </b-menu-list>
          </b-menu>
        </div>
      </transition>
        <div class="column">
          <b-field>
            <b-autocomplete
              v-model="commandInput"
              placeholder="Select a command"
              ref="commandInput"
              field="name"
              :icon="commandSelected ? categoryIcon(commandSelected) : 'magnify'"
              :data="filteredCommands"
              :disabled="saving"
              @select="selectCommand">
              <template slot-scope="props">
                <b-icon
                  :icon="categoryIcon(props.option)"
                  size="is-small" />
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
            :candidates="module.input.candidates"
            :list="whitelist"
            :categoryIcon="categoryIcon"
            :selectCondition="listCheck">
              <template slot="label">
                Whitelist
                <p><small>This command can be used in these channels/categories by these users/roles.</small></p>
              </template>
          </CommandToggleInput>
          <CommandToggleInput
            :command="commandSelected"
            :guild="guild"
            icon="minus"
            :module="module"
            :candidates="module.input.candidates"
            :list="blacklist"
            :categoryIcon="categoryIcon"
            :selectCondition="listCheck">
              <template slot="label">
                Blacklist
              <p><small>This command cannot be used in these channels/categories or by these users/roles.</small></p>
              </template>
          </CommandToggleInput>
        </div>
      </div>
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
      allRule: null,
      commandsRules: [],
      categoriesRules: [],
      // Save
      changed: false
    }
  },
  computed: {
    filteredCommands () {
      return this.module.input.commands.filter(this.filter(this.commandInput))
    },
    emptyMenu () {
      return !this.allRule && !this.categoriesRules.length && !this.commandsRules.length
    }
  },
  methods: {
    // Saving
    async save () {
      if (!this.commandSelected) return

      this.saving = true
      const values = { whitelist: this.whitelist, blacklist: this.blacklist }
      await this.$api.moduleMethod(this.guild.id, this.module.name, 'saveCommand', {
        cmd: this.commandSelected.category === 'all' ? 'all' : this.commandSelected.name,
        values,
        isCategory: this.commandSelected.category === 'category'
      })

      this.setRules(this.commandSelected, values)
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
    hasChanged () {
      if (this.commandSelected) {
        const { whitelist, blacklist } = this.parseSave()
        const { whitelist: aWhitelist, blacklist: aBlacklist } = this.getCommandRules(this.commandSelected)

        const whitelistDiff = !_.isEqual(whitelist, aWhitelist) || _.differenceWith(whitelist, aWhitelist, _.isEqual).length
        const blacklistDiff = !_.isEqual(blacklist, aBlacklist) || _.differenceWith(blacklist, aBlacklist, _.isEqual).length

        this.changed = whitelistDiff || blacklistDiff
      } else {
        this.changed = false
      }
      return this.changed
    },
    // Command input
    isSelected (command) {
      return this.commandSelected ? _.isEqual(this.commandSelected, command) : false
    },
    selectCommand (option) {
      if (!option) {
        this.commandSelected = null
        this.whitelist = []
        this.blacklist = []
        return
      }

      const { whitelist, blacklist } = this.getCommandRules(option)
      this.commandSelected = option
      this.whitelist = _.cloneDeep(whitelist)
      this.blacklist = _.cloneDeep(blacklist)
    },
    menuSelect (option) {
      this.$refs.commandInput.setSelected(option)
    },
    // Rules
    getCommandRules (command) {
      return (command.category === 'all'
        ? this.module.input.rules.all
        : command.category === 'category'
          ? this.module.input.rules.categories[command.parsedName]
          : this.module.input.rules.commands[command.parsedName]) || { blacklist: [], whitelist: [] }
    },
    setRules (command, values) {
      const checkLen = values.whitelist.length || values.blacklist.length
      if (command.category === 'all') {
        if (checkLen) this.module.input.rules.all = _.cloneDeep(values)
        else this.module.input.rules.all = null
        this.updateAllRule()
      } else if (command.category === 'category') {
        if (checkLen) this.module.input.rules.categories[command.parsedName] = _.cloneDeep(values)
        else this.$delete(this.module.input.rules.categories, command.parsedName)
        this.updateCategoriesRules()
      } else {
        if (checkLen) this.module.input.rules.commands[command.parsedName] = _.cloneDeep(values)
        else this.$delete(this.module.input.rules.commands, command.parsedName)
        this.updateCommandsRules()
      }
      this.hasChanged()
    },
    updateAllRule () {
      this.allRule = this.module.input.rules.all ? this.module.input.commands.find(c => c.category === 'all') : null
    },
    updateCategoriesRules () {
      this.categoriesRules = Object.entries(this.module.input.rules.categories)
        .map(([ k ]) => this.module.input.commands.find(c => c.parsedName === k))
    },
    updateCommandsRules () {
      this.commandsRules = Object.entries(this.module.input.rules.commands)
        .map(([ k ]) => this.module.input.commands.find(c => c.parsedName === k))
    },
    // Whitelist/Blacklist
    listCheck (candidate) {
      const iE = (v) => _.isEqual(candidate, v)
      return this.whitelist.some(iE) || this.blacklist.some(iE)
    },
    // Misc
    categoryIcon (command = this.commandSelected, key = 'category') {
      if (command.category === 'category') key = 'name'
      switch (command[key]) {
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
  },
  mounted () {
    this.updateAllRule()
    this.updateCategoriesRules()
    this.updateCommandsRules()
  },
  watch: {
    whitelist () {
      this.hasChanged()
    },
    blacklist () {
      this.hasChanged()
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

.menu-column {
  -ms-overflow-style: none;
  overflow-y: overlay;
  max-height: 415px;
  max-width: 205px;
  border-right: 2px solid #484B52;
  margin-top: 12px;
}

.menu-column::-webkit-scrollbar {
  display: none;
}

.command-category-tag {
  color: rgba(255, 255, 255, 0.2);
}
</style>
