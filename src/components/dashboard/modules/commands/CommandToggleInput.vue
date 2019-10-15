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
        :loading="fetchingCandidates"
        :data="candidates"
        @typing="getCandidates"
        @select="selectCandidate">
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
          <span v-else-if="tag.missing">
            <b-icon :icon="typeIcon(tag)" size="is-small" />
            {{ tag.id }}
          </span>
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
  props: [ 'command', 'guild', 'module', 'list', 'icon', 'selectCondition', 'categoryIcon' ],
  data () {
    return {
      candidate: '',
      candidates: [],
      fetchingCandidates: false
    }
  },
  methods: {
    getCandidates: _.debounce(async function () {
      if (!this.candidate) return

      this.fetchingCandidates = true
      const { candidates } = await this.$api.moduleMethod(this.guild.id, this.module.name, 'validCandidates', {
        q: this.candidate
      })
      this.candidates = candidates
      this.fetchingCandidates = false
    }, 500),
    addCanditate (candidate) {
      if (
        !candidate ||
        this.list.some(v => _.isEqual(candidate, v)) ||
        (this.selectCondition && this.selectCondition(candidate))
      ) return
      this.list.push(candidate)
      this.candidate = ''
    },
    selectCandidate (candidate) {
      this.addCanditate(candidate)
      this.$nextTick(() => {
        this.candidate = ''
      })
    },
    removeTag (index) {
      this.list.splice(index, 1)
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
