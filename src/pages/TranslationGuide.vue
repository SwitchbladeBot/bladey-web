<template>
  <div class="translating-guide">
    <section class="hero is-primary" v-if="markdown">
      <div class="hero-body">
        <div class="container text-container">
          <h1 class="title">
            Translation Guide
          </h1>
          Standards for translating Switchblade to your language
        </div>
      </div>
    </section>
    <section class="section guide-section">
      <div class="container">
        <section v-if="markdown" class="section">
          <div class="markdown-body">
            <vue-markdown>{{markdown}}</vue-markdown>
          </div>
        </section>
        <b-loading :active="!markdown" />
      </div>
    </section>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'TranslationGuide',
  head: {
    title: { inner: 'Translation Guide' }
  },
  components: {
    'vue-markdown': VueMarkdown
  },
  data: () => {
    return {
      markdown: null
    }
  },
  mounted: function () {
    fetch('https://cdn.jsdelivr.net/gh/SwitchbladeBot/translation-guide/README.md')
      .then(res => res.ok ? res.text() : Promise.reject(res))
      .then(res => {
        this.markdown = res
      })
  }
}
</script>

<style scoped>
.translating-guide,
.translating-guide .title {
  color: white;
}

.hero-body > .container > .title {
  font-weight: 900;
  font-style: italic;
  font-size: 50px;
}

.guide-section .title {
  font-size: 40px;
}
</style>
