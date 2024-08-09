<template>
  <div class="report-input">
    <h1 class="page-title">日報入力</h1>
    <button @click="goHome" class="back-btn">戻る</button>
    <form @submit.prevent="handleSubmit" class="report-form">
      <div class="form-group">
        <label for="date">日付</label>
        <input id="date" v-model="date" type="date" required />
      </div>
      <div class="form-group">
        <label for="startTime">開始時刻</label>
        <input id="startTime" v-model="startTime" type="time" required />
      </div>
      <div class="form-group">
        <label for="endTime">終了時刻</label>
        <input id="endTime" v-model="endTime" type="time" required />
      </div>
      <div class="form-group">
        <label for="bigCategory">大分類選択</label>
        <select id="bigCategory" v-model="bigCategory" required>
          <option disabled value="">大分類を選択</option>
          <option v-for="option in bigCategoryOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="subCategory">中分類選択</label>
        <select id="subCategory" v-model="subCategory" required>
          <option disabled value="">中分類を選択</option>
          <option v-for="option in subCategoryOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="5" placeholder="内容を入力"></textarea>
      </div>
      <button type="submit" class="submit-btn">送信</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ReportInput',
  setup() {
    const date = ref('')
    const startTime = ref('')
    const endTime = ref('')
    const bigCategory = ref('')
    const subCategory = ref('')
    const content = ref('')

    const bigCategoryOptions = ref(['分類1', '分類2', '分類3', '分類4'])
    const subCategoryOptions = ref(['サブ分類1', 'サブ分類2', 'サブ分類3', 'サブ分類4'])

    const router = useRouter()

    const getCurrentDate = () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0') // 月は0から始まるので+1
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    onMounted(() => {
      date.value = getCurrentDate()
    })

    const handleSubmit = () => {
      console.log('日付:', date.value)
      console.log('開始時刻:', startTime.value)
      console.log('終了時刻:', endTime.value)
      console.log('大分類:', bigCategory.value)
      console.log('中分類:', subCategory.value)
      console.log('内容:', content.value)

      alert('日報が送信されました')

      date.value = ''
      startTime.value = ''
      endTime.value = ''
      bigCategory.value = ''
      subCategory.value = ''
      content.value = ''
    }

    const goHome = () => {
      router.push('/home')
    }

    return {
      date,
      startTime,
      endTime,
      bigCategory,
      subCategory,
      content,
      bigCategoryOptions,
      subCategoryOptions,
      handleSubmit,
      goHome
    }
  }
})
</script>

<style scoped>
.report-input {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.report-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.submit-btn {
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.back-btn {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

.back-btn:hover {
  background-color: #e0e0e0;
}
</style>
