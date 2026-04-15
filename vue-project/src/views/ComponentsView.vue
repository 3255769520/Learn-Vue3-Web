<template>
  <PageLayout
    title="📡 组件通信"
    subtitle="父子组件、跨层级组件之间传递数据的各种方式，选对方式能让代码更清晰。"
  >

    <DemoBlock
      step="最常用"
      title="props / emit — 父子组件通信"
      problem="父组件有数据，子组件需要用；子组件发生了事情，父组件需要知道——这是最常见的场景。"
      desc="父传子用 props（属性），子传父用 emit（事件）。就像父母给孩子零花钱（props），孩子花完了告诉父母（emit）。"
      :code="codePropsEmit"
      memo="defineProps 接收父组件传来的数据，defineEmits 定义可以向父组件发送的事件。"
    >
      <div class="comm-demo">
        <div class="comm-box comm-box--parent">
          <div class="comm-box__label">父组件</div>
          <div class="comm-box__row">
            <span class="comm-box__key">传给子组件：</span>
            <span class="comm-box__val">{{ parentMsg }}</span>
          </div>
          <div class="comm-box__row">
            <span class="comm-box__key">收到子组件：</span>
            <span class="comm-box__val" :style="{ color: fromChild ? 'var(--green-600)' : 'var(--text-faint)' }">
              {{ fromChild || '（等待子组件发送）' }}
            </span>
          </div>
        </div>
        <div class="comm-arrow">
          <div class="comm-arrow__line">
            <span class="comm-arrow__label">props ↓</span>
          </div>
          <div class="comm-arrow__line">
            <span class="comm-arrow__label">emit ↑</span>
          </div>
        </div>
        <div class="comm-box comm-box--child">
          <div class="comm-box__label">子组件</div>
          <div class="comm-box__row">
            <span class="comm-box__key">收到 props：</span>
            <span class="comm-box__val">{{ parentMsg }}</span>
          </div>
          <button class="btn btn-primary btn-sm" @click="fromChild = '子组件发来的消息 👋'">
            向父组件发送消息
          </button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="跨层级"
      title="provide / inject — 祖孙组件通信"
      problem="如果数据需要从祖父组件传到孙子组件，用 props 要经过中间层，很麻烦（叫「prop drilling」）。"
      desc="provide 在祖先组件提供数据，inject 在任意后代组件获取，中间层完全不需要参与。"
      :code="codeProvide"
      memo="provide 提供的数据如果是 ref，后代组件 inject 到的也是响应式的，修改会同步。"
    >
      <div class="provide-demo">
        <div class="provide-level provide-level--ancestor">
          <span class="provide-level__label">祖先组件</span>
          <span class="provide-level__code">provide('theme', '{{ theme }}')</span>
          <button class="btn btn-sm" @click="theme = theme === 'dark' ? 'light' : 'dark'">切换主题</button>
        </div>
        <div class="provide-level provide-level--middle">
          <span class="provide-level__label">中间组件</span>
          <span class="provide-level__note">不需要参与传递</span>
        </div>
        <div class="provide-level provide-level--child" :class="`provide-level--${theme}`">
          <span class="provide-level__label">孙子组件</span>
          <span class="provide-level__code">inject('theme') = <strong>{{ theme }}</strong></span>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="总览"
      title="通信方式速查表"
      :code="codeSummary"
      memo="大多数情况用 props/emit 就够了。跨层级用 provide/inject。全局共享数据用 Pinia。"
    >
      <div class="comm-table">
        <div class="comm-table__head">
          <div>方式</div>
          <div>适用场景</div>
          <div>方向</div>
        </div>
        <div v-for="row in commMethods" :key="row[0]" class="comm-table__row">
          <div><code>{{ row[0] }}</code></div>
          <div style="color:var(--text-secondary);font-size:13px">{{ row[1] }}</div>
          <div style="color:var(--text-faint);font-size:12px">{{ row[2] }}</div>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { componentsCodes } from '@/data/codeExamples'

const parentMsg = ref('Hello from Parent')
const fromChild = ref('')
const theme = ref('dark')

const commMethods = [
  ['props / emit', '父子组件', '父→子 / 子→父'],
  ['provide / inject', '跨层级祖孙', '祖先→后代'],
  ['v-model', '父子双向绑定', '双向'],
  ['ref（组件）', '父访问子实例', '父→子'],
  ['Pinia', '全局状态共享', '任意方向'],
]

const { codePropsEmit, codeProvide, codeSummary } = componentsCodes
</script>

<style scoped>
.comm-demo { display: flex; flex-direction: column; gap: 0; }
.comm-box {
  padding: var(--space-4); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
  display: flex; flex-direction: column; gap: var(--space-2);
}
.comm-box--parent { border-color: var(--purple-200); background: var(--purple-50); }
.comm-box--child  { border-color: var(--green-200); background: var(--green-50); }
.comm-box__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); margin-bottom: var(--space-1); }
.comm-box__row { display: flex; align-items: center; gap: var(--space-2); font-size: 13px; }
.comm-box__key { color: var(--text-muted); flex-shrink: 0; }
.comm-box__val { font-weight: 600; color: var(--purple-700); }

.comm-arrow { display: flex; gap: var(--space-4); justify-content: center; padding: var(--space-2) 0; }
.comm-arrow__line { display: flex; align-items: center; }
.comm-arrow__label { font-size: 12px; color: var(--text-faint); padding: 2px 8px; background: var(--bg-muted); border-radius: 99px; border: 1px solid var(--border-subtle); }

.provide-demo { display: flex; flex-direction: column; }
.provide-level {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4); border: 1px solid var(--border-subtle);
  font-size: 13px;
}
.provide-level--ancestor { border-radius: var(--radius-md) var(--radius-md) 0 0; background: var(--purple-50); border-color: var(--purple-200); }
.provide-level--middle   { background: var(--bg-muted); border-top: none; }
.provide-level--child    { border-radius: 0 0 var(--radius-md) var(--radius-md); border-top: none; }
.provide-level--dark  { background: #1a1d2e; color: #e2e8f0; border-color: #2d3148; }
.provide-level--light { background: var(--amber-50); border-color: var(--amber-100); }
.provide-level__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); width: 80px; flex-shrink: 0; }
.provide-level__code { font-family: 'JetBrains Mono', monospace; font-size: 12px; flex: 1; }
.provide-level__note { font-size: 12px; color: var(--text-faint); flex: 1; }

.comm-table { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; }
.comm-table__head { display: grid; grid-template-columns: 1fr 1.5fr 1fr; background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle); }
.comm-table__head > div { padding: var(--space-2) var(--space-4); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); }
.comm-table__row { display: grid; grid-template-columns: 1fr 1.5fr 1fr; border-bottom: 1px solid var(--border-subtle); }
.comm-table__row:last-child { border-bottom: none; }
.comm-table__row > div { padding: var(--space-3) var(--space-4); }
</style>
