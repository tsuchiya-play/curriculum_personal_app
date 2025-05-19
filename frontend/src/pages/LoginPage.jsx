"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function LoginPage({ onLogin }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [csrfToken, setCsrfToken] = useState("")

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await fetch("http://localhost:3000/api/v1/csrf_token", {
                credentials: "include",
            })
            const data = await response.json()
            setCsrfToken(data.csrf_token)
        }

        fetchCsrfToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("") // 初期化
        setIsLoading(true)

        try {
            const response = await fetch("http://localhost:3000/api/v1/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                // エラーを配列で受け取り表示
                const messages = data.errors || data.error || ["ログインに失敗しました"]
                setError(Array.isArray(messages) ? messages : [messages])
                setIsLoading(false)
                return
            }

            // 成功時
            setIsLoading(false)
            onLogin(data.user)
            navigate("/")
        } catch (err) {
            setError(["サーバーに接続できませんでした。"])
            setIsLoading(false)
        }
    }


    return (
        <div
            className="min-h-screen bg-gray-50 flex flex-col"
            style={{ maxWidth: "360px", margin: "0 auto", border: "1px solid #ddd" }}
        >
            {/* ヘッダー */}
            <header className="bg-purple-700 text-white p-4 flex items-center">
                <button onClick={() => navigate("/")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">ログイン</h1>
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">アカウントにログイン</h2>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            パスワード
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="パスワードを入力"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="text-sm text-purple-600 hover:text-purple-800">
                            パスワードをお忘れですか？
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-md transition-colors ${isLoading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                            }`}
                    >
                        {isLoading ? "ログイン中..." : "ログイン"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        アカウントをお持ちでない方は
                        <button
                            onClick={() => navigate("/signup")}
                            className="ml-1 text-purple-600 hover:text-purple-800 font-medium"
                        >
                            新規登録
                        </button>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default LoginPage
