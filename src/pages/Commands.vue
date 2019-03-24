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
      <div v-if="categories" class="container">
        <div v-for="category in categories" v-bind:key="category.name" class="category has-text-centered">
          <b-collapse :open="true">
            <b-message :title="`${category.displayName} (${category.commands.length})`" :closable="false">
              <b-message v-for="command in category.commands" :key="command.name" class="command">
                <p class="command-usage">
                  s!{{command.name}}
                  <span v-for="arg in getArgType(command.usage)" :key="arg.arg">
                    <b-tooltip :label="arg.type + ' argument'">
                      <span :class="arg.type">{{arg.arg}}&ensp;</span>
                    </b-tooltip>
                  </span>
                </p>
                <div v-if="command.aliases">
                  <b>Aliases</b>
                  <span v-for="aliase in command.aliases" :key="aliase" class="aliase">{{aliase}}</span>
                </div>
                <vue-markdown>{{command.description}}</vue-markdown>
                <div class="subcommands" v-if="command.subcommands">
                  <b>Subcommands</b>
                  <div class="subcommand" v-for="subcmd in command.subcommands" :key="subcmd.name">
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
                      <span v-for="aliase in subcmd.aliases" :key="aliase" class="aliase">{{aliase}}</span>
                    </div>
                    <vue-markdown>{{subcmd.description}}</vue-markdown>
                  </div>
                </div>
              </b-message>
            </b-message>
          </b-collapse>
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
  data: () => ({ categories: null }),
  mounted: async function () {
    this.categories = await this.$api.commands().then(c => c.categories)
  },
  methods: {
    getArgType (usage) {
      if (!usage) return []
      const requiredRegex = /(<[a-zA-Z0-9-|@.,+: ]+>)/g
      const optionalRegex = /(\[[a-zA-Z0-9-|@.,+: ]+])/g
      const requiredArgs = usage.split(requiredRegex).map(arg => ({ type: 'required', arg }))
      const optionalArgs = usage.split(optionalRegex).map(arg => ({ type: 'optional', arg }))
      return [
        ...(requiredArgs.filter(({ arg }) => requiredRegex.test(arg))),
        ...(optionalArgs.filter(({ arg }) => optionalRegex.test(arg)))
      ]
    }
  }
}
</script>

<style scoped>
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
    color: #dd2e44;
  }
  .optional {
    color: #f4900c;
  }
  .command-usage {
    font-family: Consolas, monospace;
    color: #7289DA;
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
