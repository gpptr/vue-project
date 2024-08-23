<template>
  <!-- 見た目記述部分 -->
  <div class="login-container" type="login-form">
    <h1>日報管理システム ログイン</h1>
    <P>開発中</P>
    <form @submit.prevent="login">
      <div>
        <label for="username">ユーザーID:</label>
        <input v-model="username" type="username" id="username" required />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <br />
      <div>
        <button type="submit">ログイン</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
// インポート　別ファイルからの参照
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authSeavice'

// 変数指定
export default defineComponent({
  setup() {
    const username = ref('admin')
    const password = ref('pass')
    const errorMessage = ref('')
    const router = useRouter()

    // ログイン 認証部分
    const handleLogin = async () => {
      try {
        await login(username.value, password.value)
        router.push('/home') // 認証後に遷移する画面
      } catch (error) {
        errorMessage.value = 'ログインに失敗しました。'
      }
    }

    return {
      username,
      password,
      errorMessage,
      login: handleLogin
    }
  }
})
</script>

<!-- 以下、スタイル部分 -->
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e9eff1; /* 明るく優しい背景色 */
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2rem; /* 大きめの見出し */
  color: #2c3e50; /* 濃いグレーで洗練された色 */
  text-align: center;
  margin-bottom: 2rem;
}

form {
  background: #ffffff; /* 白い背景 */
  padding: 2rem;
  border-radius: 10px; /* 角をより丸く */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* より目立つシャドウ */
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd; /* 薄いボーダーで立体感 */
}

.form-group {
  margin-bottom: 1.5rem; /* フォーム要素の間隔を広げる */
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e; /* 少し青みがかったグレー */
  font-weight: 500; /* 少し太めのフォントで視認性向上 */
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc; /* 少し柔らかいボーダー */
  border-radius: 5px; /* 角を丸く */
  font-size: 1rem;
  transition: border-color 0.3s; /* フォーカス時の変化に対応 */
}

input:focus {
  border-color: #007bff; /* フォーカス時の色変更 */
  outline: none; /* デフォルトのアウトラインを削除 */
}

button {
  width: 100%; /* ボタンをフォーム幅に合わせる */
  padding: 0.75rem;
  background-color: #007bff; /* 青色背景 */
  color: #fff;
  border: none;
  border-radius: 5px; /* 角を丸く */
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s; /* 背景色とアニメーション */
}

button:hover {
  background-color: #0056b3; /* ホバー時の背景色変更 */
  transform: scale(1.05); /* ホバー時に少し拡大 */
}

.error {
  color: #e74c3c; /* エラー用の赤色 */
  margin-top: 1rem;
}
</style>
