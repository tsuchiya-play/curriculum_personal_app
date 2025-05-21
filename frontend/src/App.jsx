"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { getCsrfTokenFromCookie } from "./utils/csrf"
import Layout from "./components/Layout"
import TopPage from "./pages/TopPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import MyPage from "./pages/MyPage"
import EditProfilePage from "./pages/EditProfilePage"
import FestivalListPage from "./pages/FestivalListPage"
import CreateFestivalPage from "./pages/CreateFestivalPage"
import FestivalDetailPage from "./pages/FestivalDetailPage"
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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/session", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRF-Token": getCsrfTokenFromCookie(),
        },
      })

      if (response.ok) {
        setUser(null)
        setLoginMessage("ログアウトしました。")
      } else {
        console.error("ログアウト失敗")
      }
    } catch (error) {
      console.error("通信エラー", error)
    }
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
          <Route path="/my-page" element={isLoggedIn ? <MyPage onLogout={handleLogout} setUser={setUser} setLoginMessage={setLoginMessage} /> : <Navigate to="/login" />} />
          <Route path="/edit-profile" element={isLoggedIn ? <EditProfilePage /> : <Navigate to="/login" />} />
          <Route path="/festivals" element={<FestivalListPage isLoggedIn={isLoggedIn} />} />
          <Route path="/festivals/:id" element={<FestivalDetailPage />}/>
          <Route path="/create-festival" element={isLoggedIn ? <CreateFestivalPage /> : <Navigate to="/login" />} />
          {/* 404ページ */}
          <Route path="*" element={<div>ページが見つかりません</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
