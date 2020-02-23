<template>
  <div class="placeholder-input control" :class="{'is-expanded': expanded}">
    <b-input
      v-model="newValue"
      ref="input"
      :type="type"
      :size="size"
      :loading="loading"
      :rounded="rounded"
      :icon="icon"
      :icon-pack="iconPack"
      :maxlength="maxlength"
      :autocomplete="newAutocomplete"
      :use-html5-validation="useHtml5Validation"
      v-bind="$attrs"
      @input="onInput"
      @focus="focused"
      @blur="onBlur"
      @keyup.native.esc.prevent="isActive = false"
      @keydown.native.tab="tabPressed"
      @keydown.native.enter="enterPressed"
      @keydown.native.up.prevent="keyArrows('up')"
      @keydown.native.down.prevent="keyArrows('down')"
    />

    <transition name="fade">
      <div
        class="dropdown-menu is-opened-top"
        v-show="isActive && (filteredData.length > 0 || hasEmptySlot || hasHeaderSlot)"
        ref="dropdown">
        <div class="dropdown-content" v-show="isActive">
          <div
            v-if="hasHeaderSlot"
            class="dropdown-item">
            <slot name="header"/>
          </div>
          <a
            v-for="(option, index) in filteredData"
            :key="index"
            class="dropdown-item"
            :class="{ 'is-hovered': option === hovered }"
            @click="setSelected(option)">

            <slot
              v-if="hasDefaultSlot"
              :option="option"
              :index="index"
            />
            <span v-else>
              <span v-pre>{</span>{{ getValue(option, true) }}<span v-pre>}</span>
            </span>
          </a>
          <div
            v-if="filteredData.length === 0 && hasEmptySlot"
            class="dropdown-item is-disabled">
            <slot :value="placeholderValue" name="empty"/>
          </div>
          <div
            v-if="hasFooterSlot"
            class="dropdown-item">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FormElementMixin from './FormElementMixin'

const PLACEHOLDER_REGEX = /{([^\s}]*)$/

export default {
  name: 'PlaceholderInput',
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: [Number, String],
    data: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      default: 'value'
    },
    customFormatter: Function,
    type: {
      type: String,
      default: 'textarea'
    }
  },
  data () {
    return {
      hovered: null,
      isActive: false,
      newValue: this.value,
      newAutocomplete: this.autocomplete || 'off',
      hasFocus: false,
      filteredData: this.data,
      isPlaceholderInput: true,
      elementRef: 'input'
    }
  },
  computed: {
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList () {
      const whiteList = []
      whiteList.push(this.$refs.input.$el.querySelector(this.type === 'text' ? 'input' : this.type))
      whiteList.push(this.$refs.dropdown)
      // Add all chidren from dropdown
      if (this.$refs.dropdown !== undefined) {
        const children = this.$refs.dropdown.querySelectorAll('*')
        for (const child of children) {
          whiteList.push(child)
        }
      }
      if (this.$parent.$data._isTaginput) {
        // Add taginput container
        whiteList.push(this.$parent.$el)
        // Add .tag and .delete
        const tagInputChildren = this.$parent.$el.querySelectorAll('*')
        for (const tagInputChild of tagInputChildren) {
          whiteList.push(tagInputChild)
        }
      }
      return whiteList
    },
    /**
     * Check if exists default slot
     */
    hasDefaultSlot () {
      return !!this.$scopedSlots.default
    },
    /**
     * Check if exists "empty" slot
     */
    hasEmptySlot () {
      return !!this.$slots.empty
    },
    /**
     * Check if exists "header" slot
     */
    hasHeaderSlot () {
      return !!this.$slots.header
    },
    /**
     * Check if exists "footer" slot
     */
    hasFooterSlot () {
      return !!this.$slots.footer
    },
    /**
     * Placeholder tag value
     */
    placeholderValue () {
      const match = this.checkValidValue()
      return match ? match[1] : null
    }
  },
  watch: {
    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive (active) {
      if (!active) {
        this.$nextTick(() => this.setHovered(null))
      }
    },
    /**
     * When updating input's value
     *   1. Emit changes
     *   2. Open dropdown if input is valid or else close it
     */
    newValue (value) {
      this.$emit('input', value)
      // Open dropdown if input is valid or else close it
      if (this.hasFocus) {
        const match = this.checkValidValue(value)
        if (match) {
          this.isActive = true
          this.updateFilteredData(match[1])
        } else {
          this.isActive = false
        }
      }
    },
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    value (value) {
      this.newValue = value
      !this.isValid && this.$refs.input.checkHtml5Validity()
    },
    /**
     * Select first option
     */
    filteredData (value) {
      // Keep first option always pre-selected
      this.selectFirstOption(value)
    }
  },
  methods: {
    /**
     * Set which option is currently hovered.
     */
    setHovered (option) {
      if (option === undefined) return
      this.hovered = option
    },
    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected (option, closeDropdown = true) {
      if (option === undefined) return
      this.$emit('select', option)
      if (option !== null) {
        this.newValue = this.newValue.replace(PLACEHOLDER_REGEX, `{${this.getValue(option)}} `)
      }
      closeDropdown && this.$nextTick(() => { this.isActive = false })
    },
    /**
     * Select first option
     */
    selectFirstOption (options) {
      this.$nextTick(() => {
        if (options.length) {
          // If has visible data or open on focus, keep updating the hovered
          if (this.hovered !== options[0]) {
            this.setHovered(options[0])
          }
        } else {
          this.setHovered(null)
        }
      })
    },
    /**
     * Enter key listener.
     * Select the hovered option.
     */
    enterPressed (event) {
      if (!this.isActive) return
      if (this.hovered === null) return
      this.setSelected(this.hovered)
      event.preventDefault()
    },
    /**
     * Tab key listener.
     * Select hovered option if it exists, close dropdown, then allow
     * native handling to move to next tabbable element.
     */
    tabPressed (event) {
      if (this.hovered === null) {
        this.isActive = false
        return
      }
      this.setSelected(this.hovered)
      event.preventDefault()
    },
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside (event) {
      if (this.whiteList.indexOf(event.target) < 0) this.isActive = false
    },
    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue (option) {
      if (option === null) return
      if (typeof this.customFormatter !== 'undefined') {
        return this.customFormatter(option)
      }
      return typeof option === 'object'
        ? this.field.split('.').reduce((o, i) => o[i], option)
        : option
    },
    /**
     *
     */
    checkValidValue (value = this.newValue) {
      return value.match(PLACEHOLDER_REGEX)
    },
    /**
     * Updates filtered data
     */
    updateFilteredData (value) {
      this.filteredData = this.data.filter(option => {
        return this.getValue(option)
          .toLowerCase()
          .includes(value.toLowerCase())
      })
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows (direction) {
      const sum = direction === 'down' ? 1 : -1
      if (this.isActive) {
        let index = this.filteredData.indexOf(this.hovered) + sum
        index = index > this.filteredData.length - 1 ? this.filteredData.length : index
        index = index < 0 ? 0 : index
        this.setHovered(this.filteredData[index])
        const list = this.$refs.dropdown.querySelector('.dropdown-content')
        const element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index]
        if (!element) return
        const visMin = list.scrollTop
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = (
            element.offsetTop -
            list.clientHeight +
            element.clientHeight
          )
        }
      }
    },
    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused (event) {
      if (this.checkValidValue()) {
        this.isActive = true
        this.selectFirstOption(this.filteredData)
      }
      this.hasFocus = true
      this.$emit('focus', event)
    },
    /**
     * Blur listener.
     */
    onBlur (event) {
      this.hasFocus = false
      this.$emit('blur', event)
    },
    onInput (event) {
      this.$emit('typing', this.newValue)
    }
  },
  created () {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside)
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside)
    }
  }
}
</script>
