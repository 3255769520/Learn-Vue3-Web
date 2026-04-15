<template>
  <PageLayout
    title="🔄 生命周期"
    subtitle="组件从「出生」到「死亡」经历的各个阶段，Vue3 用 onXxx 钩子函数在特定时机执行代码。"
  >

    <DemoBlock
      step="第 1 步"
      title="生命周期是什么？用大白话理解"
      desc="就像人有出生、成长、死亡，Vue 组件也有自己的「一生」。Vue 在每个关键时刻都会调用对应的函数，让你有机会在那个时刻做一些事情。"
      :code="code1"
      memo="最常用的三个：onMounted（挂载完毕，可以操作 DOM、发请求）、onUpdated（数据更新后）、onBeforeUnmount（销毁前，清理定时器）。"
    >
      <div class="lifecycle-flow">
        <div
          v-for="item in lifecycle"
          :key="item.hook"
          class="lifecycle-item"
          :class="{ 'lifecycle-item--active': activeHook === item.hook }"
        >
          <div class="lifecycle-item__hook">{{ item.hook }}</div>
          <div class="lifecycle-item__desc">{{ item.desc }}</div>
          <div v-if="item.common" class="lifecycle-item__badge">常用</div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="动手观察钩子触发顺序"
      desc="点击按钮触发数据更新，观察右侧日志里钩子的执行顺序。"
      :code="code2"
      memo="setup 最先执行（相当于 beforeCreate + created），然后是挂载，然后是更新，最后是卸载。"
    >
      <div class="lifecycle-demo">
        <div class="lifecycle-demo__left">
          <div class="count-display">
            <span class="count-label">计数</span>
            <span class="count-val">{{ count }}</span>
          </div>
          <button class="btn btn-primary" @click="count++">触发更新（count+1）</button>
          <button class="btn btn-sm" @click="logs = []" style="margin-top:var(--space-2)">清空日志</button>
        </div>
        <div class="lifecycle-demo__log">
          <div class="log-header">执行日志</div>
          <div class="log-body">
            <div v-if="!logs.length" class="log-empty">组件已挂载，点击按钮触发更新...</div>
            <div v-for="(log, i) in logs" :key="i" class="log-item">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-hook" :style="{ color: log.color }">{{ log.hook }}</span>
              <span class="log-msg">{{ log.msg }}</span>
            </div>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="Vue2 vs Vue3 生命周期对比"
      :code="codeCompare"
      memo="Vue3 把 beforeCreate 和 created 合并成了 setup，其他钩子都加了 on 前缀，beforeDestroy 改名为 onBeforeUnmount。"
    >
      <div class="compare-table">
        <div class="compare-table__head">
          <div>阶段</div>
          <div>Vue2</div>
          <div>Vue3</div>
        </div>
        <div v-for="row in compareData" :key="row[0]" class="compare-table__row">
          <div class="compare-table__key">{{ row[0] }}</div>
          <div style="color:var(--text-muted);font-family:'JetBrains Mono',monospace;font-size:12px">{{ row[1] }}</div>
          <div style="color:var(--purple-600);font-family:'JetBrains Mono',monospace;font-size:12px">{{ row[2] }}</div>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { lifecycleCodes } from '@/data/codeExamples'

const count = ref(0)
const activeHook = ref('')
const logs = ref<{ time: string; hook: string; msg: string; color: string }[]>([])

function addLog(hook: string, msg: string, color: string) {
  const time = new Date().toLocaleTimeString('zh', { hour12: false })
  logs.value.push({ time, hook, msg, color })
  activeHook.value = hook
}

onBeforeMount(() => addLog('onBeforeMount', '挂载前', '#a78bfa'))
onMounted(() => addLog('onMounted', '挂载完毕，可操作 DOM', '#22c55e'))
onBeforeUpdate(() => addLog('onBeforeUpdate', '数据变化，DOM 更新前', '#f59e0b'))
onUpdated(() => addLog('onUpdated', 'DOM 已更新完毕', '#3b82f6'))
onBeforeUnmount(() => addLog('onBeforeUnmount', '卸载前', '#ef4444'))
onUnmounted(() => addLog('onUnmounted', '已卸载', '#ef4444'))

const lifecycle = [
  { hook: 'setup()', desc: '创建阶段，最先执行，替代 beforeCreate + created', common: true },
  { hook: 'onBeforeMount', desc: '挂载前，模板已编译，DOM 未生成', common: false },
  { hook: 'onMounted', desc: '挂载完毕，可以访问 DOM 元素、发请求', common: true },
  { hook: 'onBeforeUpdate', desc: '数据变化，DOM 更新之前', common: false },
  { hook: 'onUpdated', desc: 'DOM 已根据最新数据更新完毕', common: false },
  { hook: 'onBeforeUnmount', desc: '卸载前，适合清理定时器、取消订阅', common: true },
  { hook: 'onUnmounted', desc: '组件已完全卸载', common: false },
]

const compareData = [
  ['创建', 'beforeCreate / created', 'setup()'],
  ['挂载前', 'beforeMount', 'onBeforeMount'],
  ['挂载后', 'mounted', 'onMounted'],
  ['更新前', 'beforeUpdate', 'onBeforeUpdate'],
  ['更新后', 'updated', 'onUpdated'],
  ['卸载前', 'beforeDestroy', 'onBeforeUnmount'],
  ['卸载后', 'destroyed', 'onUnmounted'],
]

const { code1, code2, codeCompare } = lifecycleCodes
</script>

<style scoped>
.lifecycle-flow { display: flex; flex-direction: column; gap: var(--space-2); }
.lifecycle-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  transition: all 0.2s;
}
.lifecycle-item--active { border-color: var(--purple-400); background: var(--purple-50); }
.lifecycle-item__hook { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--purple-600); width: 160px; flex-shrink: 0; font-weight: 500; }
.lifecycle-item__desc { font-size: 13px; color: var(--text-secondary); flex: 1; }
.lifecycle-item__badge { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 99px; background: var(--green-50); color: var(--green-700); border: 1px solid var(--green-200); flex-shrink: 0; }

.lifecycle-demo { display: flex; gap: var(--space-4); }
.lifecycle-demo__left { display: flex; flex-direction: column; gap: var(--space-3); flex-shrink: 0; }
.count-display {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.count-label { font-size: 13px; color: var(--text-muted); }
.count-val { font-size: 28px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }

.lifecycle-demo__log { flex: 1; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; }
.log-header { padding: var(--space-2) var(--space-3); background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); }
.log-body { background: var(--code-bg); max-height: 200px; overflow-y: auto; }
.log-empty { padding: var(--space-3) var(--space-4); font-size: 12px; color: #4d5580; }
.log-item { display: flex; gap: var(--space-3); padding: 5px var(--space-4); border-bottom: 1px solid #1e2235; font-size: 12px; }
.log-time { color: #4d5580; flex-shrink: 0; font-family: 'JetBrains Mono', monospace; }
.log-hook { font-family: 'JetBrains Mono', monospace; width: 140px; flex-shrink: 0; font-weight: 500; }
.log-msg { color: #64748b; }

.compare-table { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; font-size: 13px; }
.compare-table__head { display: grid; grid-template-columns: 0.8fr 1fr 1fr; background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle); }
.compare-table__head > div { padding: var(--space-2) var(--space-4); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); }
.compare-table__row { display: grid; grid-template-columns: 0.8fr 1fr 1fr; border-bottom: 1px solid var(--border-subtle); }
.compare-table__row:last-child { border-bottom: none; }
.compare-table__row > div { padding: var(--space-3) var(--space-4); }
.compare-table__key { color: var(--text-primary); font-weight: 500; font-size: 13px; }
</style>
