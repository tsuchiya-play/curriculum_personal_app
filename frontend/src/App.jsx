"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import TopPage from "./pages/TopPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import "./App.css"

function App() {
  // ログイン状態を管理（実際の実装ではAPIやコンテキストから取得）
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ログイン/ログアウトの切り替え（デモ用）
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
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
                <TopPage isLoggedIn={isLoggedIn} />
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
