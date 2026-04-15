<template>
  <PageLayout
    title="⚛️ reactive / toRefs / toRef"
    subtitle="专门用于对象类型的响应式 API，直接修改属性，不需要 .value。"
  >

    <DemoBlock
      step="第 1 步"
      title="reactive — 对象专用，直接改属性"
      problem="用 ref 包对象时，每次都要写 car.value.price，有点烦。reactive 专门为对象设计，直接写 car.price 就行。"
      desc="reactive() 让整个对象变成响应式的，包括深层嵌套的属性。修改任何层级的属性，页面都会更新。"
      :code="code1"
      memo="reactive 只能用于对象/数组，不能用于数字、字符串等基本类型。基本类型必须用 ref。"
    >
      <div class="demo-rows">
        <div class="stat-row">
          <span class="stat-label">汽车</span>
          <span class="stat-val">{{ car.brand }}</span>
          <span class="stat-sub">价值 <strong style="color:var(--amber-600)">{{ car.price }}</strong> 万</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">游戏</span>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span v-for="g in games" :key="g.id" class="tag">{{ g.name }}</span>
          </div>
        </div>
        <div class="stat-row">
          <span class="stat-label">深层值</span>
          <span class="stat-val" style="color:var(--green-600)">{{ obj.a.b.c.d }}</span>
          <span class="stat-sub">obj.a.b.c.d</span>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="car.price += 10">价格 +10</button>
          <button class="btn btn-primary" @click="games[0].name = '流星蝴蝶剑'">改游戏</button>
          <button class="btn btn-primary" @click="obj.a.b.c.d = 999">改深层值</button>
          <button class="btn" @click="resetAll">重置</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="ref vs reactive — 怎么选？"
      :code="codeCompare"
      memo="推荐原则：基本类型（数字、字符串）→ 必须用 ref；对象 → ref 和 reactive 都行，但 reactive 写起来更简洁。"
    >
      <div class="compare-table">
        <div class="compare-table__head">
          <div></div>
          <div>ref</div>
          <div>reactive</div>
        </div>
        <div v-for="row in compareRows" :key="row[0]" class="compare-table__row">
          <div class="compare-table__key">{{ row[0] }}</div>
          <div :class="row[1][1]">{{ row[1][0] }}</div>
          <div :class="row[2][1]">{{ row[2][0] }}</div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="toRefs / toRef — 解构时保持响应式"
      problem="直接解构 reactive 对象会失去响应式：const { name } = person，这样 name 就变成普通变量了。"
      desc="toRefs 可以把 reactive 对象的每个属性都转成 ref，这样解构出来的变量还是响应式的。"
      :code="code3"
      memo="解构 reactive 对象时，记得用 toRefs 包一下。toRefs 批量转换，toRef 转换单个属性。"
    >
      <div class="demo-rows">
        <div class="stat-row">
          <span class="stat-label">姓名</span>
          <span class="stat-val">{{ name }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">年龄</span>
          <span class="stat-val">{{ age }}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">性别</span>
          <span class="stat-val">{{ gender }}</span>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="name += '~'">改名字</button>
          <button class="btn btn-primary" @click="age += 1">年龄+1</button>
          <button class="btn btn-primary" @click="gender = gender === '男' ? '女' : '男'">切换性别</button>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { reactive, toRefs, toRef } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { reactiveCodes } from '@/data/codeExamples'

const car = reactive({ brand: '奔驰', price: 100 })
const games = reactive([
  { id: '01', name: '英雄联盟' },
  { id: '02', name: '王者荣耀' },
  { id: '03', name: '原神' }
])
const obj = reactive({ a: { b: { c: { d: 666 } } } })
function resetAll() { car.price = 100; games[0].name = '英雄联盟'; obj.a.b.c.d = 666 }

const person = reactive({ name: '张三', age: 18, gender: '男' })
const { name, gender } = toRefs(person)
const age = toRef(person, 'age')

const { code1, codeCompare, code3 } = reactiveCodes

const compareRows = [
  ['适用类型',  ['基本类型 + 对象', 'ok'], ['仅对象类型', 'warn']],
  ['访问方式',  ['JS 中需要 .value', 'warn'], ['直接访问属性', 'ok']],
  ['整体替换',  ['可以（不失响应式）', 'ok'], ['需用 Object.assign', 'warn']],
  ['解构',      ['可直接解构', 'ok'], ['需配合 toRefs', 'warn']],
]
</script>

<style scoped>
.demo-rows { display: flex; flex-direction: column; gap: var(--space-3); }
.stat-row {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.stat-label { font-size: 13px; color: var(--text-muted); width: 60px; flex-shrink: 0; }
.stat-val { font-size: 17px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }
.stat-sub { font-size: 12px; color: var(--text-faint); margin-left: auto; }
.btn-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }

.compare-table { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; font-size: 13px; }
.compare-table__head {
  display: grid; grid-template-columns: 1.2fr 1fr 1fr;
  background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle);
}
.compare-table__head > div { padding: var(--space-2) var(--space-4); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); }
.compare-table__row { display: grid; grid-template-columns: 1.2fr 1fr 1fr; border-bottom: 1px solid var(--border-subtle); }
.compare-table__row:last-child { border-bottom: none; }
.compare-table__row > div { padding: var(--space-3) var(--space-4); }
.compare-table__key { color: var(--text-primary); font-weight: 500; }
.ok   { color: var(--green-700); }
.warn { color: var(--amber-600); }
</style>
