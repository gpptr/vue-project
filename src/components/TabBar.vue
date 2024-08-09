<template>
  <div class="tab-bar">
    <button @click="navigateTo('/input')" class="tab-button">日報入力</button>
    <button @click="navigateTo('/summary')" class="tab-button">日報集計</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const router = useRouter()
    const navigateTo = (path: string) => {
      router.push(path)
    }

    return { navigateTo }
  }
})
</script>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: center;
  padding: 15px;
  border-bottom: 2px solid #007bff; /* ボーダーの色を変更 */
  background-color: #f8f9fa; /* 背景色を追加 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 影を追加 */
}

.tab-button {
  background-color: #007bff; /* ボタンの背景色 */
  color: #fff; /* ボタンの文字色 */
  border: none;
  border-radius: 25px; /* 丸みを追加 */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;
  transition:
    background-color 0.3s,
    transform 0.2s; /* ホバー時の変化 */
}

.tab-button:hover {
  background-color: #0056b3; /* ホバー時の背景色 */
  transform: scale(1.05); /* ホバー時にボタンを少し拡大 */
}

.tab-button:active {
  background-color: #004494; /* クリック時の背景色 */
}
</style>
