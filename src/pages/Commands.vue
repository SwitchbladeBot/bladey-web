<template>
  <div class="contributors">
    <section class="hero is-primary" v-if="categories">
      <div class="hero-body">
        <div class="container text-container">
          <h1 class="title">
            Commands
          </h1>
          The commands that makes Switchblade special
        </div>
      </div>
    </section>
    <section class="section categories">
      <div v-if="categories" class="container categories">
        <b-field>
          <b-input v-model.lazy="commandSearch"
           placeholder="Search..."
           type="search"
           icon="magnify">
          </b-input>
        </b-field>
        <h2 v-if="nothingFound">Nothing found.</h2>
        <div v-for="category in filteredCommands" :key="category.name">
          <b-message
            v-if="category.commands.length"
            :title="`${category.displayName} (${category.commands.length})`"
            :closable="false"
            class="category">
            <b-message
              v-for="command in category.commands"
              :key="command.name"
              class="command">
              <p :href="'#' + command.name" class="command-usage">
                s!{{command.name}}
                <span
                  v-for="arg in getArgType(command.usage)"
                  :key="arg.arg">
                  <b-tooltip :label="arg.type + ' argument'">
                    <span :class="arg.type">{{arg.arg}}&ensp;</span>
                  </b-tooltip>
                </span>
              </p>
              <div v-if="command.aliases">
                <b>Aliases</b>
                <span
                  v-for="aliase in command.aliases"
                  :key="aliase"
                  class="aliase">{{aliase}}</span>
              </div>
              <vue-markdown>{{command.description}}</vue-markdown>
              <div class="subcommands" v-if="command.subcommands">
                <b>Subcommands</b>
                <div
                  class="subcommand"
                  v-for="subcmd in command.subcommands"
                  :key="subcmd.name">
                  <p class="command-usage">
                    s!{{subcmd.name}}
                    <span v-for="arg in getArgType(subcmd.usage)" :key="arg.arg">
                      <b-tooltip :label="arg.type + ' argument'">
                        <span :class="arg.type">{{arg.arg}}&ensp;</span>
                      </b-tooltip>
                    </span>
                  </p>
                  <div v-if="subcmd.aliases">
                    <b>Aliases</b>
                    <span
                      v-for="aliase in subcmd.aliases"
                      :key="aliase"
                      class="aliase">{{aliase}}</span>
                  </div>
                  <vue-markdown>{{subcmd.description}}</vue-markdown>
                </div>
              </div>
            </b-message>
          </b-message>
        </div>
      </div>
    </section>
    <b-loading :active="!categories" />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'Commands',
  head: { title: { inner: 'Commands' } },
  components: {
    VueMarkdown
  },
  data: () => ({ categories: null, commandSearch: '' }),
  mounted: async function () {
    this.categories = await this.$api.commands().then(c => c.categories)
  },
  methods: {
    getArgType (usage) {
      if (!usage) return []
      const requiredRegex = /(<.[^<>]+>)/g
      const optionalRegex = /(\[.[^[\]]+])/g
      const requiredArgs = usage.split(requiredRegex).map(arg => ({ type: 'required', arg }))
      const optionalArgs = usage.split(optionalRegex).map(arg => ({ type: 'optional', arg }))
      return [
        ...(requiredArgs.filter(({ arg }) => requiredRegex.test(arg))),
        ...(optionalArgs.filter(({ arg }) => optionalRegex.test(arg)))
      ]
    }
  },
  computed: {
    filteredCommands () {
      const filterInclude = q => q.toLowerCase().includes(this.commandSearch.toLowerCase())
      const filter = c => filterInclude(c.name) || filterInclude(c.description) || (c.aliases ? c.aliases.find(a => filterInclude(a)) : false)
      const filtered = this.categories.map(c => ({ ...c, commands: c.commands.filter(filter) }))
      return this.categories
        ? filtered
        : []
    },
    nothingFound () {
      return !this.filteredCommands.filter(c => !!c.commands.length).length
    }
  }
}
</script>

<style lang="scss" scoped>
  $blurple: #7289DA;
  $required: #dd2e44;
  $optional: #f4900c;
  .category {
    margin-bottom: 60px;
  }
  .hero-body > .container > .title {
    font-weight: 900;
    font-style: italic;
    font-size: 50px;
  }
  .command {
    margin-bottom: 15px;
  }
  .required {
    color: $required;
  }
  .optional {
    color: $optional;
  }
  .command-usage {
    font-family: Consolas, monospace;
    color: $blurple !important;
  }
  .aliase {
    background: rgba(255, 255, 255, .15);
    padding: 4px;
    margin-left: 5px;
    font-family: Consolas, monospace;
    border-radius: 5px;
  }
  .subcommands {
    padding-top: 10px;
  }
  .subcommand{
    margin-top: 10px;
    padding-left: 13px;
    border-left: 1px white solid;
  }
</style>
