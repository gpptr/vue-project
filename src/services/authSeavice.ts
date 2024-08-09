// 　// 本番用ソース　現在はローカルテストの為コメントアウト中　APIが出来次第、解除予定
// src/services/authService.ts

// export async function login(username: string, password: string): Promise<void> {
//   const response = await fetch('https://example.com/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ username, password })
//   })

//   if (!response.ok) {
//     throw new Error('ログインに失敗しました')
//   }

//   const data = await response.json()
//   localStorage.setItem('authToken', data.token) // 認証トークンを保存
// }

// export function isAuthenticated(): boolean {
//   return !!localStorage.getItem('authToken')
// }

// export function logout(): void {
//   localStorage.removeItem('authToken')
// }

// src/services/authService.ts

export async function login(username: string, password: string): Promise<void> {
  // ローカルでの認証用の条件
  if (username === 'admin' && password === 'pass') {
    // 認証トークンを模擬的に生成
    localStorage.setItem('authToken', 'mockToken')
  } else {
    throw new Error('ログインに失敗しました')
  }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken')
}

export function logout(): void {
  localStorage.removeItem('authToken')
}
