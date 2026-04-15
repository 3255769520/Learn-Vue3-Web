<template>
  <PageLayout
    title="🪝 自定义 Hook"
    subtitle="把 setup 里的逻辑封装成函数，方便复用。类似 Vue2 的 mixin，但更清晰、更灵活。"
  >

    <DemoBlock
      step="第 1 步"
      title="为什么需要自定义 Hook？"
      problem="随着功能增多，setup 里的代码越来越长，计数器逻辑、请求逻辑、本地存储逻辑全混在一起，很难维护。"
      desc="把相关逻辑提取成一个函数（以 use 开头），就是自定义 Hook。每个 Hook 只做一件事，setup 里只需要调用它们。"
      :code="codeCounter"
      memo="Hook 命名以 use 开头（useCounter、useFetch），内部可以用所有 Composition API，包括 ref、watch、onMounted 等。"
    >
      <div class="hook-demo">
        <div class="hook-card">
          <div class="hook-card__title">useCounter Hook</div>
          <div class="count-big">{{ count }}</div>
          <div class="btn-row">
            <button class="btn btn-primary" @click="increment">+1</button>
            <button class="btn btn-primary" @click="decrement">-1</button>
            <button class="btn" @click="reset">重置</button>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="useDog — 包含异步请求的 Hook"
      desc="Hook 里可以包含 onMounted，组件挂载时自动发请求。这样组件里完全不用关心请求逻辑。"
      :code="codeDog"
      memo="Hook 里的 onMounted 会在使用该 Hook 的组件挂载时执行，就像写在组件里一样。"
    >
      <div class="dog-demo">
        <div v-if="loading" class="dog-loading">
          <div class="spinner"></div>
          <span>加载中...</span>
        </div>
        <div v-else-if="error" class="dog-error">{{ error }}</div>
        <div v-else-if="dogUrl" class="dog-img-wrap">
          <img :src="dogUrl" class="dog-img" alt="随机狗狗" />
        </div>
        <button class="btn btn-primary" @click="fetchDog" :disabled="loading">
          再来一只 🐕
        </button>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="组合多个 Hook — setup 变得非常清晰"
      :code="codePattern"
      memo="每个 Hook 负责一块逻辑，setup 里只是把它们组合起来，一眼就能看出组件有哪些功能。"
    >
      <div class="principle-list">
        <div v-for="p in principles" :key="p.num" class="principle">
          <span class="principle__num">{{ p.num }}</span>
          <div>
            <div class="principle__title">{{ p.title }}</div>
            <div class="principle__desc">{{ p.desc }}</div>
          </div>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { hooksCodes } from '@/data/codeExamples'

function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => { count.value = initial }
  return { count, increment, decrement, reset }
}
const { count, increment, decrement, reset } = useCounter(0)

const dogUrl = ref('')
const loading = ref(false)
const error = ref('')
async function fetchDog() {
  loading.value = true; error.value = ''
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json()
    dogUrl.value = data.message
  } catch { error.value = '请求失败，请检查网络' }
  finally { loading.value = false }
}
onMounted(() => fetchDog())

const { codeCounter, codeDog, codePattern } = hooksCodes

const principles = [
  { num: '01', title: '命名以 use 开头', desc: 'useCounter、useFetch、useLocalStorage' },
  { num: '02', title: '返回响应式数据和方法', desc: 'return { data, loading, refresh }' },
  { num: '03', title: '可以包含生命周期钩子', desc: 'onMounted、onUnmounted 都可以在 Hook 内使用' },
  { num: '04', title: '单一职责', desc: '每个 Hook 只做一件事，便于测试和复用' },
]
</script>

<style scoped>
.hook-demo { display: flex; justify-content: center; }
.hook-card {
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
  padding: var(--space-6); text-align: center; min-width: 200px;
  box-shadow: var(--shadow-sm);
}
.hook-card__title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); margin-bottom: var(--space-3); }
.count-big { font-size: 56px; font-weight: 700; color: var(--purple-600); font-family: 'JetBrains Mono', monospace; line-height: 1; margin-bottom: var(--space-4); }
.btn-row { display: flex; gap: var(--space-2); justify-content: center; }

.dog-demo { display: flex; flex-direction: column; gap: var(--space-3); align-items: flex-start; }
.dog-loading { display: flex; align-items: center; gap: var(--space-2); color: var(--text-muted); font-size: 14px; }
.spinner {
  width: 18px; height: 18px;
  border: 2px solid var(--border-base);
  border-top-color: var(--purple-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.dog-error { color: var(--red-500); font-size: 14px; }
.dog-img-wrap { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); }
.dog-img { display: block; max-width: 220px; max-height: 160px; object-fit: cover; }

.principle-list { display: flex; flex-direction: column; gap: var(--space-3); }
.principle {
  display: flex; gap: var(--space-4); align-items: flex-start;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.principle__num { font-size: 22px; font-weight: 700; color: var(--border-base); flex-shrink: 0; width: 32px; font-family: 'JetBrains Mono', monospace; }
.principle__title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
.principle__desc { font-size: 13px; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }
</style>
