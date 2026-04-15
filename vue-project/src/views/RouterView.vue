<template>
  <PageLayout
    title="🗺️ Vue Router 4"
    subtitle="Vue3 官方路由，实现「单页应用」——切换页面不刷新，体验更流畅。"
  >

    <DemoBlock
      step="第 1 步"
      title="路由是什么？先感受一下"
      problem="传统网站点击链接会刷新整个页面，体验很差。Vue Router 让你在不刷新页面的情况下切换「视图」。"
      desc="点击下面的导航，观察内容区域的变化——URL 变了，内容变了，但页面没有刷新。"
      :code="codeSetup"
      memo="RouterLink 替代 &lt;a&gt; 标签，RouterView 是内容展示区。路由配置在单独的 router/index.ts 文件里。"
    >
      <div class="router-demo">
        <div class="router-nav">
          <button
            v-for="tab in tabs"
            :key="tab.path"
            class="router-tab"
            :class="{ 'router-tab--active': activeTab === tab.path }"
            @click="activeTab = tab.path"
          >{{ tab.label }}</button>
        </div>
        <div class="router-view">
          <component :is="currentComponent" />
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="路由传参 — 怎么传数据给目标页面？"
      desc="两种主要方式：query 参数（像搜索引擎的 ?key=value）和 params 参数（像路径的一部分 /user/123）。"
      :code="codeParams"
      memo="推荐用 query 传参，刷新页面不会丢失。params 传参需要在路由配置里声明占位符 :id。"
    >
      <div class="params-list">
        <div v-for="p in paramTypes" :key="p.type" class="param-item">
          <span class="param-type">{{ p.type }}</span>
          <code class="param-example">{{ p.example }}</code>
          <span class="param-note">{{ p.note }}</span>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="编程式导航 — 用代码跳转页面"
      desc="除了点击 RouterLink，也可以在 JS 代码里用 router.push() 跳转，比如登录成功后自动跳转到首页。"
      :code="codeNavigate"
      memo="useRouter() 获取路由实例用于跳转，useRoute() 获取当前路由信息（params、query 等）。"
    >
      <div class="api-list">
        <div v-for="api in routerApis" :key="api.name" class="api-item">
          <code class="api-name">{{ api.name }}</code>
          <span class="api-desc">{{ api.desc }}</span>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { routerCodes } from '@/data/codeExamples'

const activeTab = ref('/home')
const tabs = [
  { path: '/home', label: '🏠 首页' },
  { path: '/news', label: '📰 新闻' },
  { path: '/about', label: 'ℹ️ 关于' },
]
const HomeComp  = defineComponent({ render: () => h('div', { style: 'padding:20px;color:#16a34a;font-size:15px;font-weight:600' }, '🏠 这是首页内容') })
const NewsComp  = defineComponent({ render: () => h('div', { style: 'padding:20px;color:#2563eb;font-size:15px;font-weight:600' }, '📰 这是新闻内容') })
const AboutComp = defineComponent({ render: () => h('div', { style: 'padding:20px;color:#7c3aed;font-size:15px;font-weight:600' }, 'ℹ️ 这是关于页面') })
const currentComponent = computed(() => {
  if (activeTab.value === '/home') return HomeComp
  if (activeTab.value === '/news') return NewsComp
  return AboutComp
})

const paramTypes = [
  { type: 'query', example: '/news/detail?id=1&title=标题', note: '刷新不丢失，推荐' },
  { type: 'params', example: '/news/detail/1/标题', note: '需路由声明 :id/:title' },
  { type: 'props',  example: 'props: true', note: '路由参数直接作为组件 props' },
]

const routerApis = [
  { name: 'useRouter()', desc: '获取路由实例，用于跳转' },
  { name: 'useRoute()', desc: '获取当前路由信息（params、query、path 等）' },
  { name: 'router.push()', desc: '跳转并保留历史记录（可以后退）' },
  { name: 'router.replace()', desc: '跳转但替换当前历史（不能后退）' },
  { name: 'router.back()', desc: '后退一步' },
]

const { codeSetup, codeParams, codeNavigate } = routerCodes
</script>

<style scoped>
.router-demo { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; }
.router-nav { display: flex; background: var(--bg-muted); border-bottom: 1px solid var(--border-subtle); }
.router-tab {
  padding: 10px 20px; background: transparent; border: none; border-bottom: 2px solid transparent;
  color: var(--text-muted); cursor: pointer; font-size: 13px; font-weight: 500; font-family: inherit;
  transition: all 0.15s;
}
.router-tab:hover { color: var(--text-primary); background: var(--bg-overlay); }
.router-tab--active { color: var(--purple-600); border-bottom-color: var(--purple-500); background: var(--bg-base); }
.router-view { min-height: 70px; background: var(--bg-base); }

.params-list { display: flex; flex-direction: column; gap: var(--space-2); }
.param-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.param-type { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 99px; background: var(--purple-50); color: var(--purple-700); border: 1px solid var(--purple-200); flex-shrink: 0; }
.param-example { font-size: 12px; color: var(--blue-600); flex: 1; }
.param-note { font-size: 12px; color: var(--text-faint); flex-shrink: 0; }

.api-list { display: flex; flex-direction: column; gap: var(--space-2); }
.api-item {
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
}
.api-name { font-size: 13px; font-weight: 500; color: var(--purple-700); width: 140px; flex-shrink: 0; }
.api-desc { font-size: 13px; color: var(--text-secondary); }
</style>
