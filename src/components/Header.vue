<template>
  <header>
    <div class="notification">
      <p>{{ currentDate }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    // 現在の日付を取得
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 月は0始まりなので +1
    const day = String(now.getDate()).padStart(2, '0')

    // 曜日の取得
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
    const dayOfWeek = daysOfWeek[now.getDay()]

    // フォーマットした日付と曜日を作成
    const currentDate = `今日は${year}年 ${month}月 ${day}日 (${dayOfWeek})です。`

    return {
      currentDate
    }
  }
})
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.notification {
  font-size: 16px;
  color: #333;
}
</style>
