<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-header__title">{{ title }}</h1>
      <p class="page-header__subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>()
</script>

<style scoped>
.page { max-width: 800px; }

.page-header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}

.page-header__title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-2);
}

.page-header__subtitle {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
