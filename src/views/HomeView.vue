<template>
  <div class="home-page">
    <div class="home-card">
      <h1 class="text-h3">TOP</h1>
      <Header />
      <TabBar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import TabBar from '@/components/TabBar.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Header,
    TabBar
  },
  setup() {
    const router = useRouter()

    const goToSummary = () => {
      router.push('/summary')
    }

    const goToInput = () => {
      router.push('/input')
    }

    return {
      goToSummary,
      goToInput
    }
  }
})
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column; /* 修正: コンポーネントを縦に並べる */
  align-items: center;
  height: 100vh;
  background-color: #e3f2fd;
}

.home-card {
  width: 500px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.text-h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;
  transition: background-color 0.3s;
}

.secondary {
  background-color: #f0f0f0;
  color: #000;
}

.primary {
  background-color: #007bff;
  color: #fff;
}

.btn:hover {
  opacity: 0.9;
}
</style>
