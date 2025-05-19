"use client"

import React from "react"
import Header from "./components/Header"
import TopPage from "./pages/TopPage"
import "./App.css"

function App() {
  // ログイン状態を管理（実際の実装ではAPIやコンテキストから取得）
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  // ログイン/ログアウトの切り替え（デモ用）
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className="App" style={{ maxWidth: "360px", minHeight: "800px", margin: "0 auto", border: "1px solid #ddd" }}>
      <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
      <TopPage isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
