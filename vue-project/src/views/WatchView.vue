<template>
  <PageLayout
    title="👁️ watch / watchEffect"
    subtitle="监视数据变化，在变化时执行副作用（发请求、打日志、更新其他数据等）。"
  >

    <DemoBlock
      step="情况一"
      title="监视 ref 基本类型"
      desc="直接把 ref 变量传给 watch，不要写 .value。可以拿到新值和旧值，也可以通过返回值停止监视。"
      :code="code1"
      memo="watch(sum, callback) — 第一个参数直接写变量名，不加 .value。"
    >
      <div class="watch-demo">
        <div class="watch-stat">
          <span class="watch-stat__label">当前求和</span>
          <span class="watch-stat__val">{{ sum }}</span>
          <span v-if="sum >= 5" class="badge-warn">已停止监视（≥5）</span>
        </div>
        <div class="watch-log">{{ watchLog1 }}</div>
        <button class="btn btn-primary" @click="sum++">sum + 1</button>
      </div>
    </DemoBlock>

    <DemoBlock
      step="情况二"
      title="监视 ref 对象类型"
      desc="监视的是对象的「地址值」。要监视对象内部属性的变化，需要手动加 deep: true。"
      :code="code2"
      memo="修改对象属性时，newValue 和 oldValue 是同一个对象（都是新值）。替换整个对象时才有新旧之分。"
    >
      <div class="watch-demo">
        <div class="watch-stat">
          <span class="watch-stat__label">姓名</span>
          <span class="watch-stat__val">{{ person.name }}</span>
          <span class="watch-stat__label" style="margin-left:16px">年龄</span>
          <span class="watch-stat__val">{{ person.age }}</span>
        </div>
        <div class="watch-log">{{ watchLog2 }}</div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="person.name += '~'">改名字</button>
          <button class="btn btn-primary" @click="person.age++">年龄+1</button>
          <button class="btn" @click="person = { name: '李四', age: 90 }">替换整个对象</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="情况三"
      title="监视 reactive 对象"
      desc="reactive 对象默认开启深度监视，不需要写 deep: true，改任何属性都能监视到。"
      :code="code3"
      memo="reactive 对象的 watch 默认就是深度监视，这点和 ref 对象不同。"
    >
      <div class="watch-demo">
        <div class="watch-stat">
          <span class="watch-stat__label">姓名</span>
          <span class="watch-stat__val">{{ rPerson.name }}</span>
          <span class="watch-stat__label" style="margin-left:16px">年龄</span>
          <span class="watch-stat__val">{{ rPerson.age }}</span>
        </div>
        <div class="watch-log">{{ watchLog3 }}</div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="rPerson.name += '~'">改名字</button>
          <button class="btn btn-primary" @click="rPerson.age++">年龄+1</button>
          <button class="btn" @click="Object.assign(rPerson, { name: '王五', age: 25 })">Object.assign 替换</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="情况四"
      title="监视对象中的某个属性"
      desc="要监视对象的某个属性，需要写成函数形式：() => person.name。这是最推荐的写法。"
      :code="code4"
      memo="监视对象属性时，推荐统一写函数式 () => obj.prop，更明确，也更安全。"
    >
      <div class="watch-demo">
        <div class="watch-stat">
          <span class="watch-stat__label">姓名</span>
          <span class="watch-stat__val">{{ p4.name }}</span>
          <span class="watch-stat__label" style="margin-left:16px">车</span>
          <span class="watch-stat__val">{{ p4.car.c1 }} / {{ p4.car.c2 }}</span>
        </div>
        <div class="watch-log">{{ watchLog4 }}</div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="p4.name += '~'">改名字</button>
          <button class="btn btn-primary" @click="p4.car.c1 = '奥迪'">改第一台车</button>
          <button class="btn" @click="p4.car = { c1: '雅迪', c2: '爱玛' }">替换整个车</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="watchEffect"
      title="watchEffect — 自动追踪，不用指定监视谁"
      problem="watch 需要明确写出监视哪个数据，有时候很麻烦。watchEffect 会自动追踪函数里用到的所有响应式数据。"
      desc="watchEffect 立即执行一次，然后自动追踪函数内用到的响应式数据，任何一个变化都会重新执行。"
      :code="codeWE"
      memo="watchEffect 适合「只要某些条件满足就执行」的场景，不需要关心具体是哪个数据变了。"
    >
      <div class="watch-demo">
        <div class="watch-stat">
          <span class="watch-stat__label">水温</span>
          <span class="watch-stat__val" style="color:var(--red-500)">{{ temp }}℃</span>
          <span class="watch-stat__label" style="margin-left:16px">水位</span>
          <span class="watch-stat__val" style="color:var(--blue-500)">{{ height }}cm</span>
        </div>
        <div v-if="temp >= 50 || height >= 20" class="callout callout--amber">
          🔔 条件触发！已联系服务器（水温 {{ temp }}℃，水位 {{ height }}cm）
        </div>
        <div class="watch-log">{{ weLog }}</div>
        <div class="btn-row">
          <button class="btn btn-primary" @click="temp += 10">水温 +10</button>
          <button class="btn btn-primary" @click="height += 1">水位 +1</button>
          <button class="btn" @click="temp = 0; height = 0">重置</button>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { watchCodes } from '@/data/codeExamples'

const sum = ref(0)
const watchLog1 = ref('等待变化...')
const stopWatch = watch(sum, (newVal, oldVal) => {
  watchLog1.value = `sum 变化：${oldVal} → ${newVal}`
  if (newVal >= 5) { stopWatch(); watchLog1.value += '（已停止监视）' }
})

const person = ref({ name: '张三', age: 18 })
const watchLog2 = ref('等待变化...')
watch(person, () => { watchLog2.value = `person 变化了` }, { deep: true })

const rPerson = reactive({ name: '张三', age: 18 })
const watchLog3 = ref('等待变化...')
watch(rPerson, () => { watchLog3.value = `rPerson 变化了（reactive 默认深度监视）` })

const p4 = reactive({ name: '张三', age: 18, car: { c1: '奔驰', c2: '宝马' } })
const watchLog4 = ref('等待变化...')
watch(() => p4.car, () => { watchLog4.value = `car 变化了` }, { deep: true })

const temp = ref(0)
const height = ref(0)
const weLog = ref('等待触发...')
watchEffect(() => {
  if (temp.value >= 50 || height.value >= 20) {
    weLog.value = `触发：水温${temp.value}℃ 水位${height.value}cm`
  } else {
    weLog.value = '等待触发（水温≥50 或 水位≥20）...'
  }
})

const { code1, code2, code3, code4, codeWE } = watchCodes
</script>

<style scoped>
.watch-demo { display: flex; flex-direction: column; gap: var(--space-3); }
.watch-stat {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.watch-stat__label { font-size: 13px; color: var(--text-muted); }
.watch-stat__val { font-size: 18px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; }
.badge-warn { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px; background: var(--red-100); color: var(--red-500); margin-left: auto; }

.watch-log {
  padding: var(--space-2) var(--space-3);
  background: var(--code-bg); color: #86efac;
  border-radius: var(--radius-md); font-family: 'JetBrains Mono', monospace; font-size: 12px;
}

.btn-row { display: flex; gap: var(--space-2); flex-wrap: wrap; }

.callout { padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: 13px; line-height: 1.6; }
.callout--amber { background: var(--amber-50); border: 1px solid var(--amber-100); color: var(--amber-600); }
</style>
