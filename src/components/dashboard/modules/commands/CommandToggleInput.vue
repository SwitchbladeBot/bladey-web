<template>
  <section class="field">
    <b-field>
      <template slot="label">
        <slot name="label" />
      </template>
      <b-autocomplete
        v-model="candidate"
        placeholder="Select a candidate"
        field="name"
        :icon="icon"
        :disabled="!command"
        :data="filteredCandidates"
        :clear-on-select="true"
        @select="addCanditate">
          <template slot-scope="props">
            <span v-if="tagCondition(props.option, 'user')">
              <b-icon :icon="typeIcon(props.option)" size="is-small" />
              {{ `${props.option.displayName}#${props.option.discriminator}` }}
            </span>
            <span v-else-if="tagCondition(props.option, 'all')">
              <b-icon :icon="typeIcon(props.option)" size="is-small" />
              All channels
            </span>
            <span v-else-if="props.option.missing">
              <b-icon :icon="typeIcon(props.option)" size="is-small" />
              {{ props.option.id }}
            </span>
            <span v-else>
              <b-icon :icon="typeIcon(props.option)" size="is-small" />
              {{ props.option.name }}
            </span>
            <small v-if="props.option.type !== 'all'" class="command-category-tag">{{ props.option.type }}</small>
          </template>
          <template slot="empty">No results for {{ candidate }}</template>
      </b-autocomplete>
    </b-field>
    <b-taglist>
      <b-tag
        v-for="(tag, index) in list"
        :key="index"
        :type="tag.missing ? 'is-danger' : 'is-primary'"
        :tabstop="false"
        closable
        @close="removeTag(index)">
          <span v-if="tagCondition(tag, 'user')">
            <b-icon :icon="typeIcon(tag)" size="is-small" />
            {{ `${tag.displayName}#${tag.discriminator}` }}
          </span>
          <span v-else-if="tagCondition(tag, 'all')">
            <b-icon :icon="typeIcon(tag)" size="is-small" />
            all channels
          </span>
          <b-tooltip v-else-if="tag.missing" label="Invalid rule">
            <b-icon :icon="typeIcon(tag)" size="is-small" />
            {{ tag.id }}
          </b-tooltip>
          <span v-else>
            <b-icon :icon="typeIcon(tag)" size="is-small" />
            {{ tag.name }}
          </span>
        </b-tag>
    </b-taglist>
  </section>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'CommandToggleInput',
  props: [ 'command', 'guild', 'module', 'list', 'icon', 'selectCondition', 'categoryIcon', 'candidates' ],
  data () {
    return {
      candidate: ''
    }
  },
  computed: {
    filteredCandidates () {
      const check = (v) => v.toLowerCase().includes(this.candidate.toLowerCase())
      return this.candidates.filter(c => (
        (c.name && check(c.name)) ||
        (c.displayName && check(c.displayName)) ||
        (c.type === 'all' && (check('all channels') || check('*')))
      ))
    }
  },
  methods: {
    addCanditate (candidate) {
      if (
        !candidate ||
        this.list.some(v => _.isEqual(candidate, v)) ||
        (this.selectCondition && this.selectCondition(candidate))
      ) return
      this.list.push(candidate)
      this.$emit('add', candidate)
    },
    removeTag (index) {
      const [ candidate ] = this.list.splice(index, 1)
      this.$emit('remove', candidate)
    },
    tagCondition (tag, type) {
      return tag.type === type && !tag.missing
    },
    typeIcon (o) {
      switch (o.type) {
        case 'user':
          return 'at'
        case 'role':
          return 'briefcase'
        case 'channel':
          return 'pound'
        case 'category':
          return 'file-tree'
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
