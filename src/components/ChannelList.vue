<template>
  <aside class="sidebar">
    <template v-for="(items, i) in data">
      <p :key="items.category">
        {{ items.category }}
      </p>
      <ul :key="i">
        <li v-for="page in items" :key="page.name">
          <router-link v-if="page.name" :to="page.path">
            <span class="sidebar-menu-text">{{ page.name }}</span>
          </router-link>
        </li>
      </ul>
    </template>
  </aside>
</template>

<script>
export default {
  props: { data: Array }
}
</script>
