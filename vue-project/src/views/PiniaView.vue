<template>
  <PageLayout
    title="🍍 Pinia 状态管理"
    subtitle="Vue3 官方推荐的状态管理库，比 Vuex 简单很多，用来管理多个组件共享的数据。"
  >

    <DemoBlock
      step="第 1 步"
      title="为什么需要 Pinia？"
      problem="A 组件和 B 组件都需要用同一份数据，用 props 传来传去很麻烦。Pinia 提供一个「全局仓库」，任何组件都能直接读写。"
      desc="把共享数据放在 store 里，任何组件都可以直接访问和修改，不需要层层传递。"
      :code="codeDefine"
      memo="defineStore 第一个参数是唯一 ID（字符串），第二个是配置。推荐用 Composition 写法，和 setup 一样的语法。"
    >
      <div class="store-visual">
        <div class="store-box">
          <div class="store-box__title">🍍 Pinia Store</div>
          <div class="store-row">
            <span class="store-key">count</span>
            <span class="store-val">{{ count }}</span>
          </div>
          <div class="store-row">
            <span class="store-key">doubleCount</span>
            <span class="store-val store-val--computed">{{ doubleCount }}</span>
            <span class="store-badge">getter</span>
          </div>
        </div>
        <div class="store-arrows">
          <div class="store-arrow">← 任意组件都能读写 →</div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="读取和修改 Store 数据"
      desc="在组件里用 storeToRefs 解构 store 的数据（保持响应式），方法直接从 store 解构。"
      :code="codeUse"
      memo="storeToRefs 只用于解构数据（state、getters），方法不需要用 storeToRefs，直接解构就行。"
    >
      <div class="pinia-demo">
        <div class="pinia-stat">
          <div class="pinia-stat__item">
            <span class="pinia-stat__label">count</span>
            <span class="pinia-stat__val">{{ count }}</span>
          </div>
          <div class="pinia-stat__item">
            <span class="pinia-stat__label">doubleCount</span>
            <span class="pinia-stat__val pinia-stat__val--amber">{{ doubleCount }}</span>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="increment">+1</button>
          <button class="btn btn-primary" @click="decrement">-1</button>
          <button class="btn" @click="reset">重置</button>
          <button class="btn" @click="patchUpdate">$patch 设为 100</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="Options 写法 vs Composition 写法"
      :code="codeCompose"
      memo="两种写法都可以，Composition 写法更灵活，和 setup 语法一致，推荐使用。"
    >
      <div class="compare-table">
        <div class="compare-table__head">
          <div></div>
          <div>Options 写法</div>
          <div>Composition 写法</div>
        </div>
        <div v-for="row in compareRows" :key="row[0]" class="compare-table__row">
          <div class="compare-table__key">{{ row[0] }}</div>
          <div style="color:var(--text-muted);font-family:'JetBrains Mono',monospace;font-size:12px">{{ row[1] }}</div>
          <div style="color:var(--purple-600);font-family:'JetBrains Mono',monospace;font-size:12px">{{ row[2] }}</div>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { piniaCodes } from '@/data/codeExamples'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
function increment() { count.value++ }
function decrement() { count.value-- }
function reset() { count.value = 0 }
function patchUpdate() { count.value = 100 }

const { codeDefine, codeUse, codeCompose } = piniaCodes

const compareRows = [
  ['数据', 'state: () => ({})', 'ref / reactive'],
  ['计算', 'getters: {}', 'computed()'],
  ['方法', 'actions: {}', 'function'],
]
</script>

<style scoped>
.store-visual { display: flex; flex-direction: column; gap: var(--space-3); align-items: center; }
.store-box {
  background: var(--bg-base); border: 2px solid var(--purple-400); border-radius: var(--radius-lg);
  padding: var(--space-5); min-width: 260px;
}
.store-box__title { font-size: 13px; font-weight: 700; color: var(--purple-600); margin-bottom: var(--space-3); }
.store-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: 1px solid var(--border-subtle); }
.store-row:last-child { border-bottom: none; }
.store-key { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--text-muted); width: 120px; }
.store-val { font-size: 20px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }
.store-val--computed { color: var(--amber-600); }
.store-badge { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 99px; background: var(--amber-50); color: var(--amber-600); border: 1px solid var(--amber-100); margin-left: auto; }
.store-arrows { font-size: 13px; color: var(--text-faint); }

.pinia-demo { display: flex; flex-direction: column; gap: var(--space-3); }
.pinia-stat { display: flex; gap: var(--space-3); }
.pinia-stat__item {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: var(--space-1);
  padding: var(--space-4); background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.pinia-stat__label { font-size: 12px; color: var(--text-faint); font-family: 'JetBrains Mono', monospace; }
.pinia-stat__val { font-size: 36px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }
.pinia-stat__val--amber { color: var(--amber-600); }
.btn-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }

.compare-table { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; font-size: 13px; }
.compare-table__head { display: grid; grid-template-columns: 0.6fr 1fr 1fr; background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle); }
.compare-table__head > div { padding: var(--space-2) var(--space-4); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); }
.compare-table__row { display: grid; grid-template-columns: 0.6fr 1fr 1fr; border-bottom: 1px solid var(--border-subtle); }
.compare-table__row:last-child { border-bottom: none; }
.compare-table__row > div { padding: var(--space-3) var(--space-4); }
.compare-table__key { color: var(--text-primary); font-weight: 500; }
</style>
