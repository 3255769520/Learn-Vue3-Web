export interface NavItem {
  path: string
  label: string
  icon: string
  group: string
  desc: string
}

export const navItems: NavItem[] = [
  // 基础
  { path: '/setup', label: 'setup 语法', icon: '⚡', group: '核心语法', desc: 'setup概述、返回值、语法糖' },
  { path: '/ref', label: 'ref 响应式', icon: '🔗', group: '核心语法', desc: 'ref基本类型与对象类型' },
  { path: '/reactive', label: 'reactive', icon: '⚛️', group: '核心语法', desc: 'reactive对象、toRefs、toRef' },
  { path: '/computed', label: 'computed', icon: '🧮', group: '核心语法', desc: '计算属性的读取与修改' },
  { path: '/watch', label: 'watch / watchEffect', icon: '👁️', group: '核心语法', desc: '五种监视情况 + watchEffect' },
  { path: '/lifecycle', label: '生命周期', icon: '🔄', group: '核心语法', desc: 'Vue3生命周期钩子' },
  { path: '/hooks', label: '自定义 Hook', icon: '🪝', group: '核心语法', desc: '封装复用逻辑' },
  // 路由
  { path: '/router', label: 'Vue Router', icon: '🗺️', group: '路由', desc: '路由基础、嵌套、传参' },
  // Pinia
  { path: '/pinia', label: 'Pinia', icon: '🍍', group: '状态管理', desc: 'store读写、getters、订阅' },
  // 组件通信
  { path: '/components', label: '组件通信', icon: '📡', group: '进阶', desc: 'props、emit、provide/inject等' },
]
