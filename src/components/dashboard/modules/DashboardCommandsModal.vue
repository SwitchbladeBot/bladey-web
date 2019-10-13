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
            <small class="command-category-tag">{{ props.option.category }}</small>
          </template>
          <template slot="empty">No results for {{ commandInput }}</template>
        </b-autocomplete>
      </b-field>
      <hr>
      <!-- Whitelist -->
      <b-field>
        <template slot="label">
          Whitelist
          <p><small>This command can only be used in these channels/categories by these users/roles.</small></p>
        </template>
        <b-autocomplete
          v-model="whitelistCandidate"
          placeholder="Select a candidate"
          field="name"
          icon="plus"
          :disabled="!commandSelected"
          :loading="fetchingWhitelistCandidates"
          :data="whitelistCandidates"
          @typing="getWhitelistCandidates"
          @select="selectWhitelistCandidate">
          <template slot-scope="props">
            <span v-if="props.option.type === 'user'">
              <b-icon icon="at" size="is-small" />
              {{ `${props.option.displayName}#${props.option.discriminator}` }}
            </span>
            <span v-if="props.option.type === 'role'">
              <b-icon icon="briefcase" size="is-small" />
              {{ props.option.name }}
            </span>
            <span v-if="props.option.type === 'channel'">
              <b-icon icon="pound" size="is-small" />
              {{ props.option.name }}
            </span>
            <span v-if="props.option.type === 'category'">
              <b-icon icon="shape" size="is-small" />
              {{ props.option.name }}
            </span>
            <small class="command-category-tag">{{ props.option.type }}</small>
          </template>
          <template slot="empty">No results for {{ whitelistCandidate }}</template>
        </b-autocomplete>
      </b-field>
      <b-taglist>
        <b-tag
          v-for="(tag, index) in whitelist"
          :key="index"
          type="is-primary"
          :tabstop="false"
          closable
          @close="removeWhitelist(index)">
            <span v-if="tag.type === 'user'">
              <b-icon icon="at" size="is-small" />
              {{ `${tag.displayName}#${tag.discriminator}` }}
            </span>
            <span v-if="tag.type === 'role'">
              <b-icon icon="briefcase" size="is-small" />
              {{ tag.name }}
            </span>
            <span v-if="tag.type === 'channel'">
              <b-icon icon="pound" size="is-small" />
              {{ tag.name }}
            </span>
            <span v-if="tag.type === 'category'">
              <b-icon icon="shape" size="is-small" />
              {{ tag.name }}
            </span>
        </b-tag>
      </b-taglist>
      <!-- Blacklist -->
      <b-field>
        <template slot="label">
          Blacklist
          <p><small>This command can't be used in these channels/categories or by these users/roles.</small></p>
        </template>
        <b-autocomplete
          v-model="blacklistCandidate"
          placeholder="Select a candidate"
          field="name"
          icon="minus"
          :disabled="!commandSelected"
          :loading="fetchingBlacklistCandidates"
          :data="blacklistCandidates"
          @typing="getBlacklistCandidates"
          @select="selectBlacklistCandidate">
          <template slot-scope="props">
            <span v-if="props.option.type === 'user'">
              <b-icon icon="at" size="is-small" />
              {{ `${props.option.displayName}#${props.option.discriminator}` }}
            </span>
            <span v-if="props.option.type === 'role'">
              <b-icon icon="briefcase" size="is-small" />
              {{ props.option.name }}
            </span>
            <span v-if="props.option.type === 'channel'">
              <b-icon icon="pound" size="is-small" />
              {{ props.option.name }}
            </span>
            <span v-if="props.option.type === 'category'">
              <b-icon icon="shape" size="is-small" />
              {{ props.option.name }}
            </span>
            <small class="command-category-tag">{{ props.option.type }}</small>
          </template>
          <template slot="empty">No results for {{ blacklistCandidate }}</template>
        </b-autocomplete>
      </b-field>
      <b-taglist>
        <b-tag
          v-for="(tag, index) in blacklist"
          :key="index"
          type="is-primary"
          :tabstop="false"
          closable
          @close="removeBlacklist(index)">
            <span v-if="tag.type === 'user'">
              <b-icon icon="at" size="is-small" />
              {{ `${tag.displayName}#${tag.discriminator}` }}
            </span>
            <span v-if="tag.type === 'role'">
              <b-icon icon="briefcase" size="is-small" />
              {{ tag.name }}
            </span>
            <span v-if="tag.type === 'channel'">
              <b-icon icon="pound" size="is-small" />
              {{ tag.name }}
            </span>
            <span v-if="tag.type === 'category'">
              <b-icon icon="shape" size="is-small" />
              {{ tag.name }}
            </span>
        </b-tag>
      </b-taglist>
    </section>
    <footer class="modal-card-foot module-card-footer">
      <b-button type="is-primary" :loading="this.saving" :disabled="!changed" @click="save()">Save</b-button>
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardCommandsModal',
  props: [ 'guild', 'module', 'saveCallback' ],
  data () {
    return {
      saving: false,
      moduleValues: JSON.parse(JSON.stringify(this.module.values)),
      whitelist: [],
      blacklist: [],
      // Command
      commandInput: '',
      commandSelected: null,
      fetchingCommand: false,
      // Whitelist
      whitelistCandidate: '',
      whitelistCandidates: [],
      fetchingWhitelistCandidates: false,
      // Blacklist
      blacklistCandidate: '',
      blacklistCandidates: [],
      fetchingBlacklistCandidates: false
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
        cmd: this.commandSelected.name,
        values: { whitelist: this.whitelist, blacklist: this.blacklist }
      })
      this.saveCallback(this.module, null, true)
    },
    parseSave () {
      return { whitelist: this.whitelist, blacklist: this.blacklist }
    },
    filter (text) {
      const t = text.toLowerCase()
      return c => (
        c.name.toLowerCase().includes(t) ||
        (c.aliases && c.aliases.some(a => a.toLowerCase().includes(t))) ||
        c.category.toLowerCase().includes(t)
      )
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
      }
    },
    async selectCommand (option) {
      if (!option) {
        this.commandSelected = null
        this.whitelistCandidate = ''
        this.whitelistCandidates = []
        this.fetchingWhitelistCandidates = false
        this.whitelist = []
        this.blacklistCandidate = ''
        this.blacklistCandidates = []
        this.fetchingBlacklistCandidates = false
        this.blacklist = []
        return
      }

      this.fetchingCommand = true
      const cmd = await this.$api.moduleMethod(this.guild.id, this.module.name, 'retrieveCommand', {
        cmd: option.name
      })
      this.commandSelected = { ...option, ...cmd }
      this.whitelist = _.cloneDeep(cmd.whitelist)
      this.blacklist = _.cloneDeep(cmd.blacklist)
      this.fetchingCommand = false
      console.log(this.commandSelected)
    },
    // Whitelist
    getWhitelistCandidates: _.debounce(async function () {
      if (!this.whitelistCandidate) return

      this.fetchingWhitelistCandidates = true
      const { candidates } = await this.$api.moduleMethod(this.guild.id, this.module.name, 'validCandidates', {
        q: this.whitelistCandidate
      })
      this.whitelistCandidates = candidates
      this.fetchingWhitelistCandidates = false
    }, 500),
    selectWhitelistCandidate (candidate) {
      if (!candidate ||
        this.whitelist.some(v => _.isEqual(candidate, v)) ||
        this.blacklist.some(v => _.isEqual(candidate, v))
      ) return
      this.whitelist.push(candidate)
      this.whitelistCandidate = ''
    },
    removeWhitelist (index) {
      this.whitelist.splice(index, 1)
    },
    // Blacklist
    getBlacklistCandidates: _.debounce(async function () {
      if (!this.blacklistCandidate) return

      this.fetchingBlacklistCandidates = true
      const { candidates } = await this.$api.moduleMethod(this.guild.id, this.module.name, 'validCandidates', {
        q: this.blacklistCandidate
      })
      this.blacklistCandidates = candidates
      this.fetchingBlacklistCandidates = false
    }, 500),
    selectBlacklistCandidate (candidate) {
      if (!candidate ||
        this.whitelist.some(v => _.isEqual(candidate, v)) ||
        this.blacklist.some(v => _.isEqual(candidate, v))
      ) return
      this.blacklist.push(candidate)
      this.blacklistCandidate = ''
    },
    removeBlacklist (index) {
      this.blacklist.splice(index, 1)
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
