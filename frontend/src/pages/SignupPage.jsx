"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // 最低限：空欄だけチェック（Railsにリクエストすらしない）
        if (!email || !password || !confirmPassword) {
            setError("すべての項目を入力してください");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        name,
                        email,
                        password,
                        password_confirmation: confirmPassword,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Railsのバリデーションエラーを表示（形式によって調整）
                const errorMessage =
                    data.errors?.full_messages?.join(",") || data.error || "登録に失敗しました";
                setError(errorMessage.filter(Boolean));
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setIsLoading(false);
        } catch (err) {
            setError("通信エラーが発生しました。");
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-50 flex flex-col"
            style={{ maxWidth: "360px", margin: "0 auto", border: "1px solid #ddd" }}
        >
            {/* ヘッダー */}
            <header className="bg-purple-700 text-white p-4 flex items-center">
                <button onClick={() => navigate("/login")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">アカウント登録</h1>
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 p-6">
                {success ? (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">登録完了！</h2>
                        <p className="text-gray-600 mb-8">アカウントが正常に作成されました。</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg shadow-md transition-colors"
                        >
                            ログインする
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">新規アカウント作成</h2>

                        {error.length > 0 && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                                    <ul className="text-sm space-y-1">
                                        {error.map((msg, idx) => (
                                            <li key={idx}>・{msg}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    名前
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="ユーザー名"
                                    />
                                </div>
                            </div>

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
                                        placeholder="8文字以上"
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
                                <p className="mt-1 text-xs text-gray-500">8文字以上の英数字を入力してください</p>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    パスワード（確認）
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="パスワードを再入力"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-md transition-colors ${isLoading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {isLoading ? "登録中..." : "アカウント登録"}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            すでにアカウントをお持ちの方は
                            <button
                                onClick={() => navigate("/login")}
                                className="ml-1 text-purple-600 hover:text-purple-800 font-medium"
                            >
                                ログイン
                            </button>
                        </p>
                    </>
                )}
            </main>
        </div>
    )
}

export default SignupPage
