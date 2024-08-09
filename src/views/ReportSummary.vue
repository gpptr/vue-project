<template>
  <!-- 見た目記述部分 -->
  <div class="summary-page">
    <div class="summary-card">
      <div class="card-header">
        <div class="header-content">
          <button @click="goHome" class="back-btn">戻る</button>
          <h1 class="text-h3">日報集計</h1>
        </div>
      </div>
      <div class="card-controls">
        <div class="date-controls">
          <div class="start">
            <label for="start-date">開始日:</label>
            <input type="date" id="start-date" v-model="startDate" @change="filterData" />
          </div>

          <div class="end">
            <label for="end-date">終了日:</label>
            <input type="date" id="end-date" v-model="endDate" @change="filterData" />
          </div>
        </div>

        <div class="select-controls">
          <div class="company-name">
            <label for="category-select-1">会社名:</label>
            <select id="category-select-1" v-model="selectedCompanyName" @change="filterData">
              <option value="">全て</option>
              <option v-for="category in uniqueCompanyName" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <div class="category1">
            <label for="category-select-2">分類1:</label>
            <select id="category-select-2" v-model="selectedCategory1" @change="filterData">
              <option value="">全て</option>
              <option v-for="category in uniqueCategories1" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <div class="category2">
            <label for="category-select-3">分類2:</label>
            <select id="category-select-3" v-model="selectedCategory2" @change="filterData">
              <option value="">全て</option>
              <option v-for="category in uniqueCategories2" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <div class="category3">
            <label for="category-select-4">分類3:</label>
            <select id="category-select-4" v-model="selectedCategory3" @change="filterData">
              <option value="">全て</option>
              <option v-for="category in uniqueCategories3" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
        <button @click="clear" class="clear-btn">条件クリア</button>
      </div>
      <div class="card-content">
        <table v-if="filteredReports.length">
          <thead>
            <tr>
              <th>日付</th>
              <th>開始時刻</th>
              <th>終了時刻</th>
              <th>会社名</th>
              <th>分類1</th>
              <th>分類2</th>
              <th>分類3</th>
            </tr>
          </thead>
          <tbody>
            <!-- 表の表示部分　カラム順の指定 -->
            <tr v-for="report in filteredReports" :key="report.date + report.startTime">
              <td>{{ report.date }}</td>
              <td>{{ report.startTime }}</td>
              <td>{{ report.endTime }}</td>
              <td>{{ report.companyName }}</td>
              <td>{{ report.category1 }}</td>
              <td>{{ report.category2 }}</td>
              <td>{{ report.category3 }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>データがありません。</p>
        <div class="total-hours">合計時間: {{ totalHours }} 時間</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, ref, computed, watch } from 'vue'

interface Report {
  date: string
  startTime: string
  endTime: string
  companyName: string
  category1: string
  category2: string
  category3: string
}

export default defineComponent({
  name: 'ReportSummary',
  setup() {
    const reports: Report[] = [
      // テストデータ
      {
        date: '2024-07-01',
        startTime: '09:00',
        endTime: '17:00',
        companyName: '会社A',
        category1: '開発',
        category2: 'フロントエンド',
        category3: 'プロジェクトX'
      },
      {
        date: '2024-07-02',
        startTime: '10:00',
        endTime: '16:00',
        companyName: '会社B',
        category1: '設計',
        category2: 'バックエンド',
        category3: 'プロジェクトY'
      }
    ]

    // 変数指定
    const startDate = ref('')
    const endDate = ref('')
    const selectedCategory1 = ref('')
    const selectedCategory2 = ref('')
    const selectedCategory3 = ref('')
    const selectedCompanyName = ref('')

    const uniqueCategories1 = computed(() =>
      Array.from(new Set(reports.map((report) => report.category1)))
    )
    const uniqueCategories2 = computed(() =>
      Array.from(new Set(reports.map((report) => report.category2)))
    )
    const uniqueCategories3 = computed(() =>
      Array.from(new Set(reports.map((report) => report.category3)))
    )
    const uniqueCompanyName = computed(() =>
      Array.from(new Set(reports.map((report) => report.companyName)))
    )

    const clear = () => {
      startDate.value = ''
      endDate.value = ''
      selectedCompanyName.value = ''
      selectedCategory1.value = ''
      selectedCategory2.value = ''
      selectedCategory3.value = ''
    }

    // ソートフィルター部分
    const filterData = () => {
      filteredReports.value = reports.filter((report) => {
        const isDateInRange =
          (!startDate.value || report.date >= startDate.value) &&
          (!endDate.value || report.date <= endDate.value)
        const isCategory1Match = selectedCategory1.value
          ? report.category1 === selectedCategory1.value
          : true
        const isCategory2Match = selectedCategory2.value
          ? report.category2 === selectedCategory2.value
          : true
        const isCategory3Match = selectedCategory3.value
          ? report.category3 === selectedCategory3.value
          : true
        const isCategoryCompanyName = selectedCompanyName.value
          ? report.companyName === selectedCompanyName.value
          : true
        return (
          isDateInRange &&
          isCategory1Match &&
          isCategory2Match &&
          isCategory3Match &&
          isCategoryCompanyName
        )
      })
    }

    const filteredReports = ref(reports)
    filterData() // 初期フィルタリング

    watch(
      [
        startDate,
        endDate,
        selectedCategory1,
        selectedCategory2,
        selectedCategory3,
        selectedCompanyName
      ],
      filterData
    ) // 選択が変わるたびにフィルタリングを実行

    const goHome = () => router.push('/home')

    // 合計時間を計算するコンピューテッドプロパティ
    const totalHours = computed(() => {
      return filteredReports.value
        .reduce((total, report) => {
          const start = new Date(`1970-01-01T${report.startTime}:00`)
          const end = new Date(`1970-01-01T${report.endTime}:00`)
          const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60) // ミリ秒を時間に変換
          return total + diff
        }, 0)
        .toFixed(2) // 小数点以下2桁にフォーマット
    })

    return {
      startDate,
      endDate,
      selectedCategory1,
      selectedCategory2,
      selectedCategory3,
      selectedCompanyName,
      uniqueCategories1,
      uniqueCategories2,
      uniqueCategories3,
      uniqueCompanyName,
      filteredReports,
      filterData,
      goHome,
      clear,
      totalHours
    }
  }
})
</script>

<!-- スタイル部分 -->
<style scoped>
.summary-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.summary-card {
  width: 80%;
  max-width: 800px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-content .back-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 20px 10px 0;
}

.header-content .text-h3 {
  text-align: center;
  margin: 0;
}

.card-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.date-controls,
.select-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.date-controls > div,
.select-controls > div {
  flex: 1;
  min-width: 200px;
}

.card-controls label {
  display: block;
  margin-bottom: 5px;
}

.card-controls select,
.card-controls input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.card-content {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.total-hours {
  padding: 20px;
  font-size: 1.25rem;
  font-weight: bold;
}

.text-h3 {
  font-size: 1.75rem;
  margin: 0;
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

.back-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.5);
}

.total-hours {
  padding: 20px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: right;
}
</style>
