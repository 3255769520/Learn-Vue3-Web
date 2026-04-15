<template>
  <div class="block">

    <!-- 问题引入条 -->
    <div v-if="problem" class="block__problem">
      <span class="block__problem-icon">🤔</span>
      <span>{{ problem }}</span>
    </div>

    <!-- 标题行 -->
    <div class="block__header">
      <div v-if="step" class="block__step">{{ step }}</div>
      <h3 class="block__title">{{ title }}</h3>
    </div>

    <!-- 说明 -->
    <p v-if="desc" class="block__desc">{{ desc }}</p>

    <!-- 交互 Demo -->
    <div v-if="$slots.default" class="block__demo">
      <div class="block__demo-bar">
        <span class="block__demo-dot block__demo-dot--red"></span>
        <span class="block__demo-dot block__demo-dot--yellow"></span>
        <span class="block__demo-dot block__demo-dot--green"></span>
        <span class="block__demo-label">动手试试</span>
      </div>
      <div class="block__demo-body">
        <slot />
      </div>
    </div>

    <!-- 代码 -->
    <div v-if="code" class="block__code">
      <div class="block__code-bar">
        <span class="block__code-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="vertical-align:-2px;margin-right:4px">
            <polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          对应代码
        </span>
        <button class="block__code-toggle" @click="showCode = !showCode">
          {{ showCode ? '收起' : '展开' }}
        </button>
      </div>
      <div v-show="showCode" class="block__code-body">
        <pre><code>{{ code }}</code></pre>
      </div>
    </div>

    <!-- 记忆要点 -->
    <div v-if="memo" class="block__memo">
      <span class="block__memo-icon">💡</span>
      <span>{{ memo }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title: string
  step?: string
  problem?: string
  desc?: string
  code?: string
  memo?: string
}>(), {})

const showCode = ref(true)
</script>

<style scoped>
.block {
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s;
}
.block:hover { box-shadow: var(--shadow-md); }

/* 问题引入 */
.block__problem {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: #faf5ff;
  border-bottom: 1px solid var(--purple-200);
  font-size: 14px;
  color: var(--purple-700);
  line-height: 1.65;
}
.block__problem-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

/* 标题 */
.block__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-5) 0;
}
.block__step {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 99px;
  background: var(--purple-600);
  color: white;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.block__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

/* 说明 */
.block__desc {
  padding: var(--space-2) var(--space-5) 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Demo 区 */
.block__demo {
  margin: var(--space-4) var(--space-5);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-subtle);
}
.block__demo-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px var(--space-4);
  background: var(--bg-muted);
  border-bottom: 1px solid var(--border-subtle);
}
.block__demo-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.block__demo-dot--red    { background: #ff5f57; }
.block__demo-dot--yellow { background: #febc2e; }
.block__demo-dot--green  { background: #28c840; }
.block__demo-label {
  font-size: 11px;
  color: var(--text-faint);
  margin-left: var(--space-2);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.block__demo-body { padding: var(--space-5); }

/* 代码 */
.block__code {
  margin: 0 var(--space-5) var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.block__code-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px var(--space-4);
  background: var(--bg-muted);
  border-bottom: 1px solid var(--border-subtle);
}
.block__code-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}
.block__code-toggle {
  font-size: 12px;
  font-family: inherit;
  background: var(--bg-base);
  border: 1px solid var(--border-base);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  padding: 2px 10px;
  cursor: pointer;
  transition: all 0.12s;
}
.block__code-toggle:hover {
  border-color: var(--purple-400);
  color: var(--purple-600);
}
.block__code-body pre {
  margin: 0;
  border: none;
  border-radius: 0;
  max-height: 380px;
  overflow-y: auto;
}

/* 记忆要点 */
.block__memo {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin: 0 var(--space-5) var(--space-5);
  padding: var(--space-3) var(--space-4);
  background: var(--green-50);
  border: 1px solid var(--green-200);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--green-700);
  line-height: 1.65;
}
.block__memo-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
</style>
