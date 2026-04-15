// 把所有代码示例集中在这里，避免 vite dep-scan 误识别模板字符串中的 import
// 用 i + 'mport' 拼接或直接用注释风格

const im = 'import'

export const setupCodes = {
  code1: `<script setup lang="ts">
// 普通变量，不是响应式的
let name = '张三'
let age = 18

function changeName() {
  name = '李四' // 页面不会更新！
}
<\/script>`,

  code2: `<!-- setup 语法糖写法 -->
<script setup lang="ts" name="Person">
  let name = '张三'
  let age = 18

  function changeName() {
    name = '李四'
  }
  // 无需 return，直接在模板中使用
<\/script>`,

  code3: `// Vue2 Options API
export default {
  data() { return { name: '张三' } },
  methods: { changeName() { this.name = '李四' } },
  computed: { upperName() { return this.name.toUpperCase() } }
}

// Vue3 Composition API（推荐）
<script setup lang="ts">
${im} { ref, computed } from 'vue'
const name = ref('张三')
const upperName = computed(() => name.value.toUpperCase())
const changeName = () => { name.value = '李四' }
<\/script>`
}

export const refCodes = {
  code1: `${im} { ref } from 'vue'

// ref 创建基本类型响应式数据
const name = ref('张三')
const age = ref(18)
const tel = '13888888888' // 普通变量，非响应式

function changeName() {
  name.value = '李四' // JS中需要 .value
}
// 模板中直接用 {{ name }}，无需 .value`,

  code2: `${im} { ref } from 'vue'

const car = ref({ brand: '奔驰', price: 100 })
const games = ref([
  { id: '01', name: '英雄联盟' },
  { id: '02', name: '王者荣耀' },
])

// 修改对象属性
car.value.price += 10
// 替换整个对象（不会失去响应式）
car.value = { brand: '宝马', price: 200 }`,

  code3: `// ✅ 正确：通过 .value 修改
name.value = '李四'

// ❌ 错误：直接替换 ref 变量本身（失去响应式）
name = ref('李四')

// 模板中自动解包
// <h2>{{ name }}</h2>  ← 不需要写 name.value`
}

export const reactiveCodes = {
  code1: `${im} { reactive } from 'vue'

const car = reactive({ brand: '奔驰', price: 100 })
const obj = reactive({ a: { b: { c: { d: 666 } } } })

// 直接修改属性，无需 .value
car.price += 10
obj.a.b.c.d = 999  // 深层也是响应式的

// ⚠️ 不能整体替换（会失去响应式）
// car = { brand: '宝马', price: 200 }  ❌
// 应该用 Object.assign
Object.assign(car, { brand: '宝马', price: 200 })  // ✅`,

  codeCompare: `// ref —— 万能，基本类型必须用它
const count = ref(0)          // 基本类型
const user = ref({ name: '张三' }) // 对象类型

// reactive —— 只能用于对象
const user = reactive({ name: '张三', age: 18 })

// 推荐原则：
// 1. 基本类型 → 必须用 ref
// 2. 对象层级不深 → ref 或 reactive 都行
// 3. 对象层级较深 → 推荐 reactive`,

  code3: `${im} { reactive, toRefs, toRef } from 'vue'

const person = reactive({ name: '张三', age: 18, gender: '男' })

// toRefs：批量解构，保持响应式
const { name, gender } = toRefs(person)

// toRef：解构单个属性
const age = toRef(person, 'age')

// 修改解构出来的值，原对象也会同步更新
name.value += '~'   // person.name 也变了`
}

export const computedCodes = {
  code1: `${im} { ref, computed } from 'vue'

const firstName = ref('zhang')
const lastName = ref('san')

// 只读计算属性
const fullName = computed(() => {
  return firstName.value + '-' + lastName.value
})
// 模板中直接用 {{ fullName }}`,

  code2: `// 可读可写的计算属性
const fullName = computed({
  get() {
    return firstName.value + '-' + lastName.value
  },
  set(val: string) {
    firstName.value = val.split('-')[0]
    lastName.value = val.split('-')[1]
  }
})

// 触发 set
fullName.value = 'li-si'
// firstName → 'li'，lastName → 'si'`,

  code3: `// computed：有缓存，依赖不变不重新计算
const fullName = computed(() => firstName.value + '-' + lastName.value)

// 普通函数：每次渲染都会执行
function getFullName() {
  return firstName.value + '-' + lastName.value
}`
}

export const watchCodes = {
  code1: `const sum = ref(0)

// 直接写 sum，不要写 sum.value
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log('sum变化了', newValue, oldValue)
  if (newValue >= 10) {
    stopWatch() // 停止监视
  }
})`,

  code2: `const person = ref({ name: '张三', age: 18 })

// 监视对象地址值
watch(person, (newValue, oldValue) => {
  // 修改属性时 newValue === oldValue（同一对象）
  // 替换整个对象时 newValue !== oldValue
}, { deep: true }) // 需要手动开启深度监视`,

  code3: `const person = reactive({ name: '张三', age: 18 })

// reactive 默认深度监视，不需要 deep:true
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue)
})`,

  code4: `const person = reactive({ name: '张三', car: { c1: '奔驰', c2: '宝马' } })

// 监视基本类型属性 → 必须写函数式
watch(() => person.name, (newVal, oldVal) => { ... })

// 监视对象类型属性 → 推荐函数式 + deep
watch(() => person.car, (newVal, oldVal) => { ... }, { deep: true })`,

  codeWE: `${im} { watchEffect } from 'vue'

// 不需要指定监视谁，自动追踪
watchEffect(() => {
  // 用到了 temp 和 height，就自动监视它们
  if (temp.value >= 50 || height.value >= 20) {
    console.log('联系服务器')
  }
})`
}

export const lifecycleCodes = {
  code1: `${im} {
  onBeforeMount, onMounted,
  onBeforeUpdate, onUpdated,
  onBeforeUnmount, onUnmounted
} from 'vue'

// setup 本身就是创建阶段
console.log('setup 执行')

onMounted(() => {
  console.log('挂载完毕，可操作 DOM')
})

onBeforeUnmount(() => {
  // 清理定时器、取消订阅等
  clearInterval(timer)
})`,

  code2: `// 常用的三个钩子
onMounted(() => {
  // 发请求、初始化第三方库、操作 DOM
  fetchData()
})

onUpdated(() => {
  // 数据更新后，需要操作更新后的 DOM
})

onBeforeUnmount(() => {
  // 组件销毁前清理副作用
  clearInterval(timer)
  eventBus.off('event', handler)
})`,

  codeCompare: `// Vue2
export default {
  beforeCreate() {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {}
}

// Vue3（setup 语法糖）
onMounted(() => {})
onBeforeUnmount(() => {})`
}

export const hooksCodes = {
  codeCounter: `// hooks/useCounter.ts
${im} { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => { count.value = initial }
  return { count, increment, decrement, reset }
}

// 组件中使用
// ${im} { useCounter } from './hooks/useCounter'
const { count, increment, decrement } = useCounter(0)`,

  codeDog: `// hooks/useDog.ts
${im} { ref, onMounted } from 'vue'

export function useDog() {
  const dogUrl = ref('')
  const loading = ref(false)

  async function fetchDog() {
    loading.value = true
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json()
    dogUrl.value = data.message
    loading.value = false
  }

  onMounted(() => fetchDog()) // 挂载时自动请求

  return { dogUrl, loading, fetchDog }
}`,

  codePattern: `// 在组件中组合多个 Hook
// ${im} { useCounter } from './hooks/useCounter'
// ${im} { useDog } from './hooks/useDog'

const { count, increment } = useCounter()
const { dogUrl, fetchDog } = useDog()

// setup 非常清晰，每个 Hook 负责一块逻辑`
}

export const routerCodes = {
  codeSetup: `// router/index.ts
// ${im} { createRouter, createWebHistory } from 'vue-router'
// ${im} Home from '@/pages/Home.vue'
// ${im} News from '@/pages/News.vue'

const router = createRouter({
  history: createWebHistory(), // history 模式（无 #）
  // history: createWebHashHistory(), // hash 模式（有 #）
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    {
      path: '/news',
      component: News,
      children: [
        { path: 'detail/:id', component: Detail, props: true }
      ]
    }
  ]
})

export default router

// main.ts
app.use(router)`,

  codeParams: `// query 传参（推荐，刷新不丢失）
router.push({ path: '/news/detail', query: { id: '1', title: '标题' } })
// 接收
const route = useRoute()
const id = route.query.id

// params 传参（需路由声明占位符）
// 路由：{ path: '/news/detail/:id/:title' }
router.push({ name: 'detail', params: { id: '1', title: '标题' } })
// 接收
const id = route.params.id

// props 配置（最优雅）
// 路由：{ path: '/detail/:id', props: true }
// 组件：defineProps(['id'])  直接用 id`,

  codeNavigate: `// ${im} { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 跳转
router.push('/home')
router.push({ name: 'detail', query: { id: '1' } })
router.replace('/home')  // 替换，不留历史
router.back()            // 后退

// 获取当前路由信息
console.log(route.path)    // '/news/detail'
console.log(route.params)  // { id: '1' }
console.log(route.query)   // { title: '标题' }`
}

export const piniaCodes = {
  codeDefine: `// stores/counter.ts
// ${im} { defineStore } from 'pinia'
// ${im} { ref, computed } from 'vue'

// Composition 写法（推荐）
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() { count.value++ }
  function reset() { count.value = 0 }

  return { count, doubleCount, increment, reset }
})

// Options 写法
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: { doubleCount: (state) => state.count * 2 },
  actions: { increment() { this.count++ } }
})`,

  codeUse: `// ${im} { storeToRefs } from 'pinia'
// ${im} { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// ✅ 用 storeToRefs 解构，保持响应式
const { count, doubleCount } = storeToRefs(store)

// ❌ 直接解构会失去响应式
// const { count } = store

// 方法直接从 store 解构（方法不需要 storeToRefs）
const { increment, reset } = store

// 批量修改
store.$patch({ count: 100 })
store.$patch((state) => { state.count += 10 })`,

  codeCompose: `// Composition 写法（更灵活，推荐）
export const useUserStore = defineStore('user', () => {
  const name = ref('张三')
  const age = ref(18)
  const isAdult = computed(() => age.value >= 18)

  async function fetchUser(id: string) {
    const data = await api.getUser(id)
    name.value = data.name
    age.value = data.age
  }

  return { name, age, isAdult, fetchUser }
})`
}

export const componentsCodes = {
  codePropsEmit: `<!-- 父组件 -->
<Child :msg="parentMsg" @send="handleSend" />

<script setup>
const parentMsg = ref('Hello')
function handleSend(data) { console.log(data) }
<\/script>

<!-- 子组件 Child.vue -->
<script setup>
const props = defineProps<{ msg: string }>()
const emit = defineEmits<{ send: [data: string] }>()

function sendToParent() {
  emit('send', '子组件的消息')
}
<\/script>`,

  codeProvide: `<!-- 祖先组件 -->
<script setup>
const theme = ref('dark')
provide('theme', theme) // 提供响应式数据
<\/script>

<!-- 任意后代组件（无需中间层传递）-->
<script setup>
const theme = inject('theme', 'dark') // 第二个参数是默认值
<\/script>`,

  codeSummary: `// v-model 语法糖（父子双向绑定）
// 父：<Child v-model:title="pageTitle" />
// 子：defineProps(['title']); defineEmits(['update:title'])

// ref 获取子组件实例
const childRef = ref()
// <Child ref="childRef" />
// childRef.value.someMethod()  需要子组件 defineExpose

// mitt 事件总线（任意组件通信）
// const emitter = mitt()
// emitter.on('event', handler)
// emitter.emit('event', data)`
}
