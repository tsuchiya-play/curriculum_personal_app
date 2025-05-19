"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import TopPage from "./pages/TopPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [loginMessage, setLoginMessage] = useState("")
  const isLoggedIn = !!user

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/api/v1/me", {
        credentials: "include", // Cookieを送信するために必須
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)  // ログイン済みユーザー情報をセット
      } else {
        setUser(null)  // 未ログイン
      }
    }
    fetchUser()
  }, [])

  // ログイン/ログアウトの切り替え
  const handleLogin = (userData) => {
    setUser(userData)
    setLoginMessage("ログインに成功しました！")
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <div
        className="App"
        style={{ maxWidth: "360px", minHeight: "800px", margin: "0 auto", border: "1px solid #ddd" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
                <TopPage isLoggedIn={isLoggedIn} message={loginMessage} />
              </Layout>
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* 保護されたルート（ログイン必須） */}
          <Route
            path="/create-festival"
            element={isLoggedIn ? <div>フェス作成ページ（実装予定）</div> : <Navigate to="/login" />}
          />
          <Route path="/my-page" element={isLoggedIn ? <div>マイページ（実装予定）</div> : <Navigate to="/login" />} />
          {/* 404ページ */}
          <Route path="*" element={<div>ページが見つかりません</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
