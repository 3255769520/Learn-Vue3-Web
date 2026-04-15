<template>
  <PageLayout
    title="🔗 ref — 让数据「活」起来"
    subtitle="Vue3 中最常用的响应式 API，用 ref() 包裹数据后，数据变了页面自动更新。"
  >

    <DemoBlock
      step="第 1 步"
      title="用 ref() 包一下，页面就会跟着变了"
      problem="上一节我们发现，普通变量改了页面不更新。解决方法很简单：用 ref() 把数据包起来。"
      desc="ref() 会把你的数据变成「响应式」的。Vue 会盯着它，一旦值变了，立刻更新页面。"
      :code="code1"
      memo="公式：const 变量名 = ref(初始值)。JS 里改值写 变量名.value = 新值，模板里直接写 {{ 变量名 }}，Vue 自动处理 .value。"
    >
      <div class="demo-grid">
        <div class="data-panel">
          <div class="data-item">
            <span class="data-item__label">姓名</span>
            <span class="data-item__val">{{ name }}</span>
            <span class="data-item__badge data-item__badge--green">响应式 ✓</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">年龄</span>
            <span class="data-item__val">{{ age }}</span>
            <span class="data-item__badge data-item__badge--green">响应式 ✓</span>
          </div>
          <div class="data-item">
            <span class="data-item__label">电话</span>
            <span class="data-item__val data-item__val--muted">{{ tel }}</span>
            <span class="data-item__badge data-item__badge--gray">普通变量</span>
          </div>
        </div>
        <div class="btn-col">
          <button class="btn btn-primary" @click="changeName">改名字</button>
          <button class="btn btn-primary" @click="changeAge">年龄 +1</button>
          <button class="btn" @click="showTel">查看电话</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title=".value 是什么？为什么要写它？"
      problem="很多新手第一次看到 name.value 会觉得奇怪——为什么不直接写 name = '李四'？"
      desc="ref() 返回的不是普通值，而是一个「盒子」对象。真正的值装在盒子的 .value 属性里。Vue 通过这个盒子来追踪变化。"
      :code="codeValue"
      memo="JS 里操作 ref 数据，要加 .value。模板里（{{ }} 里）不用加，Vue 自动帮你取。"
    >
      <div class="box-demo">
        <div class="ref-box">
          <div class="ref-box__title">ref 对象（盒子）</div>
          <div class="ref-box__row">
            <span class="ref-box__key">.value</span>
            <span class="ref-box__arrow">→</span>
            <span class="ref-box__val">{{ name }}</span>
          </div>
        </div>
        <div class="rules-list">
          <div class="rule rule--ok">
            <span class="rule__tag">JS 里</span>
            <code>name.value = '李四'</code>
            <span class="rule__result rule__result--ok">✓ 正确</span>
          </div>
          <div class="rule rule--ok">
            <span class="rule__tag">模板里</span>
            <code>&#123;&#123; name &#125;&#125;</code>
            <span class="rule__result rule__result--ok">✓ 自动解包</span>
          </div>
          <div class="rule rule--err">
            <span class="rule__tag">JS 里</span>
            <code>name = '李四'</code>
            <span class="rule__result rule__result--err">✗ 失去响应式</span>
          </div>
        </div>
      </div>
      <div style="margin-top:var(--space-3)">
        <button class="btn btn-primary" @click="name = name === '张三' ? '李四' : '张三'">切换名字（正确方式）</button>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="ref 也可以包对象和数组"
      desc="ref() 不只能包数字、字符串，对象和数组也可以。修改对象属性时，.value 后面直接点属性名就行。"
      :code="code2"
      memo="ref 包对象时，改属性写 car.value.price += 10；替换整个对象写 car.value = { ... }，两种都保持响应式。"
    >
      <div class="obj-demo">
        <div class="obj-row">
          <span class="obj-label">汽车品牌</span>
          <span class="obj-val">{{ car.brand }}</span>
        </div>
        <div class="obj-row">
          <span class="obj-label">价格（万）</span>
          <span class="obj-val obj-val--amber">{{ car.price }}</span>
        </div>
        <div class="obj-row" style="align-items:flex-start">
          <span class="obj-label">游戏列表</span>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span v-for="g in games" :key="g.id" class="tag">{{ g.name }}</span>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="car.price += 10">价格 +10</button>
          <button class="btn btn-primary" @click="games[0].name = '流星蝴蝶剑'">改第一个游戏</button>
          <button class="btn" @click="resetCar">重置</button>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { refCodes } from '@/data/codeExamples'

const name = ref('张三')
const age = ref(18)
const tel = '13888888888'
function changeName() { name.value = name.value === '张三' ? '李四' : '张三' }
function changeAge() { age.value += 1 }
function showTel() { alert(tel) }

const car = ref({ brand: '奔驰', price: 100 })
const games = ref([
  { id: '01', name: '英雄联盟' },
  { id: '02', name: '王者荣耀' },
  { id: '03', name: '原神' }
])
function resetCar() { car.value = { brand: '奔驰', price: 100 }; games.value[0].name = '英雄联盟' }

const { code1, code2 } = refCodes
const codeValue = `import { ref } from 'vue'

const name = ref('张三')
// ref() 返回的是一个对象，大概长这样：
// { value: '张三' }

// ✅ JS 里改值，要用 .value
name.value = '李四'

// ❌ 这样写会失去响应式
// name = '李四'

// ✅ 模板里不用写 .value，Vue 自动处理
// <h2>{{ name }}</h2>`
</script>

<style scoped>
.demo-grid { display: flex; gap: var(--space-4); align-items: flex-start; }
.data-panel { flex: 1; display: flex; flex-direction: column; gap: var(--space-2); }
.btn-col { display: flex; flex-direction: column; gap: var(--space-2); flex-shrink: 0; }

.data-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
.data-item__label { font-size: 13px; color: var(--text-muted); width: 50px; flex-shrink: 0; }
.data-item__val { font-size: 17px; font-weight: 700; color: var(--purple-600); flex: 1; font-family: 'JetBrains Mono', monospace; }
.data-item__val--muted { color: var(--text-faint); font-size: 14px; font-weight: 400; }
.data-item__badge { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 99px; flex-shrink: 0; }
.data-item__badge--green { background: var(--green-50); color: var(--green-700); border: 1px solid var(--green-200); }
.data-item__badge--gray  { background: var(--bg-muted); color: var(--text-faint); border: 1px solid var(--border-base); }

/* ref 盒子可视化 */
.box-demo { display: flex; gap: var(--space-5); align-items: flex-start; flex-wrap: wrap; }
.ref-box {
  background: var(--bg-base);
  border: 2px solid var(--purple-400);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  min-width: 160px;
}
.ref-box__title { font-size: 11px; color: var(--purple-500); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-3); }
.ref-box__row { display: flex; align-items: center; gap: var(--space-2); }
.ref-box__key { font-family: 'JetBrains Mono', monospace; color: #e879f9; font-size: 14px; font-weight: 500; }
.ref-box__arrow { color: var(--text-faint); }
.ref-box__val { font-size: 22px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }

.rules-list { display: flex; flex-direction: column; gap: var(--space-2); flex: 1; min-width: 220px; }
.rule { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); border: 1px solid; font-size: 13px; }
.rule--ok  { background: var(--green-50); border-color: var(--green-200); }
.rule--err { background: #fff1f2; border-color: #ffe4e6; }
.rule__tag { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; background: var(--bg-muted); color: var(--text-muted); flex-shrink: 0; }
.rule__result { font-size: 12px; font-weight: 600; flex-shrink: 0; margin-left: auto; }
.rule__result--ok  { color: var(--green-600); }
.rule__result--err { color: var(--red-500); }

/* 对象 demo */
.obj-demo { display: flex; flex-direction: column; gap: var(--space-3); }
.obj-row { display: flex; align-items: center; gap: var(--space-3); }
.obj-label { font-size: 13px; color: var(--text-muted); width: 80px; flex-shrink: 0; }
.obj-val { font-size: 17px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }
.obj-val--amber { color: var(--amber-600); }
.btn-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
</style>
