<template>
  <PageLayout
    title="🧮 computed 计算属性"
    subtitle="根据已有数据自动计算出新数据，有缓存，依赖不变就不重新计算。"
  >

    <DemoBlock
      step="第 1 步"
      title="computed 是什么？为什么不直接用函数？"
      problem="你想在模板里显示「姓 + 名」拼在一起的全名，可以直接写 {{ firstName + '-' + lastName }}，但如果很多地方都用，就很麻烦。"
      desc="computed 可以把计算逻辑封装起来，而且有缓存——只要 firstName 和 lastName 没变，不管访问多少次，都不会重新计算。"
      :code="code1"
      memo="computed 有缓存，普通函数每次渲染都执行。如果计算比较耗时，用 computed 性能更好。"
    >
      <div class="form-demo">
        <div class="form-row">
          <label class="form-label">姓</label>
          <input v-model="firstName" type="text" style="width:120px" />
        </div>
        <div class="form-row">
          <label class="form-label">名</label>
          <input v-model="lastName" type="text" style="width:120px" />
        </div>
        <div class="result-row">
          <span class="result-label">全名（只读）</span>
          <span class="result-val">{{ fullNameReadonly }}</span>
          <span class="result-note">自动计算，实时更新</span>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="可读可写的 computed（get + set）"
      desc="computed 默认只读。如果需要双向修改，可以同时提供 get 和 set 函数。"
      :code="code2"
      memo="set 里手动拆解赋值，让计算属性支持双向绑定。这在表单场景很有用。"
    >
      <div class="form-demo">
        <div class="form-row">
          <label class="form-label">姓</label>
          <input v-model="firstName2" type="text" style="width:120px" />
        </div>
        <div class="form-row">
          <label class="form-label">名</label>
          <input v-model="lastName2" type="text" style="width:120px" />
        </div>
        <div class="result-row">
          <span class="result-label">全名（可写）</span>
          <span class="result-val">{{ fullName }}</span>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="fullName = 'li-si'">改为 li-si</button>
          <button class="btn btn-primary" @click="fullName = 'wang-wu'">改为 wang-wu</button>
        </div>
        <div class="callout callout--blue">
          点击按钮修改全名，观察上面的「姓」和「名」输入框是否同步变化。
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { computedCodes } from '@/data/codeExamples'

const firstName = ref('zhang')
const lastName = ref('san')
const fullNameReadonly = computed(() => firstName.value + '-' + lastName.value)

const firstName2 = ref('zhang')
const lastName2 = ref('san')
const fullName = computed({
  get() { return firstName2.value + '-' + lastName2.value },
  set(val: string) {
    firstName2.value = val.split('-')[0]
    lastName2.value = val.split('-')[1] ?? ''
  }
})

const { code1, code2 } = computedCodes
</script>

<style scoped>
.form-demo { display: flex; flex-direction: column; gap: var(--space-3); }
.form-row { display: flex; align-items: center; gap: var(--space-3); }
.form-label { font-size: 13px; color: var(--text-muted); width: 30px; flex-shrink: 0; }

.result-row {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--purple-50); border: 1px solid var(--purple-200); border-radius: var(--radius-md);
}
.result-label { font-size: 13px; color: var(--purple-600); font-weight: 500; width: 90px; flex-shrink: 0; }
.result-val { font-size: 18px; font-weight: 700; color: var(--purple-700); font-family: 'JetBrains Mono', monospace; flex: 1; }
.result-note { font-size: 12px; color: var(--purple-400); }

.btn-row { display: flex; gap: var(--space-2); }

.callout { padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: 13px; line-height: 1.6; }
.callout--blue { background: var(--blue-50); border: 1px solid var(--blue-100); color: var(--blue-600); }
</style>
