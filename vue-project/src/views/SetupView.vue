<template>
  <PageLayout
    title="⚡ setup 是什么？"
    subtitle="Vue3 写组件的新方式，所有数据和逻辑都写在这里，比 Vue2 简洁很多。"
  >

    <DemoBlock
      step="第 1 步"
      title="先感受问题：数据变了，页面没反应"
      problem="你刚学 JS，改了变量值，但页面上显示的数字没变——这是因为普通变量不是「响应式」的，Vue 不知道它变了。"
      desc="点击下面的按钮，你会发现页面上的名字和年龄没有任何变化。打开浏览器控制台（F12），才能看到值确实改了。"
      :code="code1"
      memo="普通变量改了页面不会自动更新。要让页面跟着变，需要用 ref() 包一下——下一节就讲这个。"
    >
      <div class="data-card">
        <div class="data-row">
          <span class="data-label">页面显示的名字</span>
          <span class="data-val">{{ name }}</span>
          <span class="data-note">点按钮后这里不会变</span>
        </div>
        <div class="data-row">
          <span class="data-label">页面显示的年龄</span>
          <span class="data-val">{{ age }}</span>
        </div>
        <div class="btn-row">
          <button class="btn" @click="changeName">改名字</button>
          <button class="btn" @click="changeAge">年龄 +1</button>
        </div>
        <div class="callout callout--purple">
          👆 点了没反应？对，这就是问题所在。打开 F12 控制台看看，值其实改了，但页面不知道。
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 2 步"
      title="&lt;script setup&gt; — Vue3 最推荐的写法"
      problem="Vue2 里写组件要写 export default { data(), methods() }，很繁琐。Vue3 提供了更简洁的写法。"
      desc="只要在 script 标签上加 setup，里面声明的变量和函数就可以直接在模板里用，不需要 return。"
      :code="code2"
      memo="以后写 Vue3 组件，直接用 &lt;script setup lang=&quot;ts&quot;&gt; 就行了，这是最推荐的写法。"
    >
      <div class="compare-grid">
        <div class="compare-card compare-card--old">
          <div class="compare-card__label">😓 Vue2 的写法</div>
          <pre class="mini-pre">export default {
  data() {
    return { name: '张三' }
  },
  methods: {
    changeName() {
      this.name = '李四'
    }
  }
}</pre>
        </div>
        <div class="compare-arrow">→</div>
        <div class="compare-card compare-card--new">
          <div class="compare-card__label">😊 Vue3 的写法</div>
          <pre class="mini-pre">&lt;script setup&gt;
// 直接写，不用 return
let name = '张三'

function changeName() {
  name = '李四'
}
&lt;/script&gt;</pre>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      step="第 3 步"
      title="Vue3 里不再用 this 了"
      desc="Vue2 里到处都是 this.xxx，Vue3 的 setup 里 this 是 undefined，直接用变量名就行。"
      :code="code3"
      memo="不用再写 this 了！直接用变量名访问数据，代码更清晰，也不会出现 this 指向错误的问题。"
    >
      <div class="diff-list">
        <div class="diff-item diff-item--bad">
          <span class="diff-tag diff-tag--bad">Vue2</span>
          <code>this.name = '李四'</code>
          <span class="diff-note">需要 this，容易出错</span>
        </div>
        <div class="diff-item diff-item--good">
          <span class="diff-tag diff-tag--good">Vue3</span>
          <code>name.value = '李四'</code>
          <span class="diff-note">直接用变量名（.value 下节讲）</span>
        </div>
      </div>
    </DemoBlock>

  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import DemoBlock from '@/components/DemoBlock.vue'
import { setupCodes } from '@/data/codeExamples'

let name = '张三'
let age = 18
function changeName() { name = '李四'; console.log('控制台：name 已改为', name, '，但页面没变') }
function changeAge() { age += 1; console.log('控制台：age 已改为', age, '，但页面没变') }

const { code1, code2, code3 } = setupCodes
</script>

<style scoped>
.data-card { display: flex; flex-direction: column; gap: var(--space-3); }

.data-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}
.data-label { font-size: 13px; color: var(--text-muted); width: 130px; flex-shrink: 0; }
.data-val { font-size: 18px; font-weight: 700; color: var(--purple-600); min-width: 60px; font-family: 'JetBrains Mono', monospace; }
.data-note { font-size: 12px; color: var(--text-faint); }

.btn-row { display: flex; gap: var(--space-2); }

.callout {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 13px;
  line-height: 1.6;
}
.callout--purple {
  background: var(--purple-50);
  border: 1px solid var(--purple-200);
  color: var(--purple-700);
}

/* 对比 */
.compare-grid { display: flex; align-items: flex-start; gap: var(--space-3); }
.compare-arrow { font-size: 20px; color: var(--text-faint); padding-top: 36px; flex-shrink: 0; }
.compare-card { flex: 1; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-base); }
.compare-card__label {
  font-size: 12px; font-weight: 600;
  padding: var(--space-2) var(--space-3);
}
.compare-card--old .compare-card__label { background: #fff1f2; color: var(--red-500); border-bottom: 1px solid #ffe4e6; }
.compare-card--new .compare-card__label { background: var(--green-50); color: var(--green-700); border-bottom: 1px solid var(--green-200); }
.mini-pre {
  margin: 0; border: none; border-radius: 0;
  font-size: 12px; padding: var(--space-3);
  max-height: 200px; overflow-y: auto;
}

/* diff */
.diff-list { display: flex; flex-direction: column; gap: var(--space-2); }
.diff-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid;
}
.diff-item--bad  { background: #fff1f2; border-color: #ffe4e6; }
.diff-item--good { background: var(--green-50); border-color: var(--green-200); }
.diff-tag {
  font-size: 11px; font-weight: 700;
  padding: 2px 8px; border-radius: 99px; flex-shrink: 0;
}
.diff-tag--bad  { background: var(--red-100); color: var(--red-500); }
.diff-tag--good { background: var(--green-100); color: var(--green-700); }
.diff-item code { flex: 1; font-size: 13px; }
.diff-note { font-size: 12px; color: var(--text-muted); }
</style>
