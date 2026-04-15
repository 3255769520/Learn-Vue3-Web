<template>
  <div class="layout">
    <!-- Topbar -->
    <header class="topbar">
      <div class="topbar__left">
        <div class="logo">
          <div class="logo__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="logo__text">Vue3 快速上手</span>
        </div>
        <div class="topbar__divider"></div>
        <span class="topbar__subtitle">面向初学者的交互式教程</span>
      </div>
      <div class="topbar__right">
        <span class="badge">Vue 3.4</span>
        <span class="badge badge--green">TypeScript</span>
      </div>
    </header>

    <div class="body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar__inner">
          <template v-for="group in groups" :key="group">
            <div class="nav-section">
              <div class="nav-section__label">{{ group }}</div>
              <RouterLink
                v-for="item in itemsByGroup(group)"
                :key="item.path"
                :to="item.path"
                class="nav-link"
                active-class="nav-link--active"
              >
                <span class="nav-link__icon">{{ item.icon }}</span>
                <div class="nav-link__body">
                  <span class="nav-link__label">{{ item.label }}</span>
                  <span class="nav-link__desc">{{ item.desc }}</span>
                </div>
              </RouterLink>
            </div>
          </template>
        </div>
      </aside>

      <!-- Content -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navItems } from '@/data/nav'

const groups = computed(() => [...new Set(navItems.map(i => i.group))])
const itemsByGroup = (group: string) => navItems.filter(i => i.group === group)
</script>

<style scoped>
.layout { display: flex; flex-direction: column; height: 100vh; background: var(--bg-subtle); }

/* Topbar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  height: 56px;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
  box-shadow: var(--shadow-xs);
  z-index: 10;
}
.topbar__left { display: flex; align-items: center; gap: var(--space-4); }
.topbar__right { display: flex; align-items: center; gap: var(--space-2); }
.topbar__divider { width: 1px; height: 20px; background: var(--border-subtle); }
.topbar__subtitle { font-size: 13px; color: var(--text-muted); }

.logo { display: flex; align-items: center; gap: var(--space-2); }
.logo__icon {
  width: 32px; height: 32px;
  background: var(--purple-600);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: white;
  flex-shrink: 0;
}
.logo__text { font-size: 15px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; }

.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 99px;
  background: var(--purple-50);
  color: var(--purple-700);
  border: 1px solid var(--purple-200);
}
.badge--green {
  background: var(--green-50);
  color: var(--green-700);
  border-color: var(--green-200);
}

/* Body */
.body { display: flex; flex: 1; overflow: hidden; }

/* Sidebar */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--bg-base);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto;
}
.sidebar__inner { padding: var(--space-4) var(--space-3); }

.nav-section { margin-bottom: var(--space-4); }
.nav-section__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  padding: var(--space-2) var(--space-3);
  margin-bottom: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  transition: all 0.12s ease;
  margin-bottom: 2px;
}
.nav-link:hover { background: var(--bg-muted); color: var(--text-primary); }
.nav-link--active {
  background: var(--purple-50);
  color: var(--purple-700);
}
.nav-link--active .nav-link__desc { color: var(--purple-400); }

.nav-link__icon { font-size: 15px; flex-shrink: 0; width: 20px; text-align: center; }
.nav-link__body { display: flex; flex-direction: column; min-width: 0; }
.nav-link__label { font-size: 13px; font-weight: 500; line-height: 1.4; }
.nav-link__desc {
  font-size: 11px;
  color: var(--text-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

/* Content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-8) var(--space-10);
  background: var(--bg-subtle);
}

@media (max-width: 900px) {
  .content { padding: var(--space-6); }
  .sidebar { width: 200px; }
}
</style>
