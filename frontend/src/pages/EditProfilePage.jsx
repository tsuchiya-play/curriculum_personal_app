"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Save, AlertCircle } from "lucide-react"

function EditProfilePage() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/me", {
                    credentials: "include",
                })
                if (!response.ok) throw new Error("ユーザー情報の取得に失敗")

                const data = await response.json()
                setName(data.user.name)
                setEmail(data.user.email)
            } catch (error) {
                console.error("ユーザーデータの取得に失敗しました", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [])

    // プロフィール情報の更新
    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsSaving(true)

        try {
            const response = await fetch(`http://localhost:3000/api/v1/update_profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",  // cookieベースの認証を保持
                body: JSON.stringify({
                    user: {
                        name,
                        email,
                    }
                })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "プロフィールの更新に失敗しました")
            }

            navigate("/my-page")
            alert("プロフィールが更新されました")
        } catch (error) {
            console.error("プロフィールの更新に失敗しました", error)
            setError(error.message || "プロフィールの更新に失敗しました。もう一度お試しください。")
        } finally {
            setIsSaving(false)
        }
    }

    // パスワード変更
    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setPasswordError("")
        setIsSaving(true)

        try {
            const response = await fetch("http://localhost:3000/api/v1/password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // cookie認証があれば含める
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "パスワードの変更に失敗しました。")
            }

            // パスワード変更成功時
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setIsChangingPassword(false)
            alert("パスワードが変更されました")
        } catch (error) {
            console.error("パスワードの変更に失敗しました", error)
            setPasswordError(error.message || "パスワードの変更に失敗しました。現在のパスワードが正しいか確認してください。")
        } finally {
            setIsSaving(false)
        }
    }


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-purple-700 text-white p-4 flex items-center">
                    <button onClick={() => navigate("/my-page")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-semibold">プロフィール編集</h1>
                </header>
                <div className="flex-1 flex items-center justify-center">
                    <p>読み込み中...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* ヘッダー */}
            <header className="bg-purple-700 text-white p-4 flex items-center">
                <button onClick={() => navigate("/my-page")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">プロフィール編集</h1>
            </header>

            {/* フォーム */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">基本情報</h2>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
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
                                    placeholder="山田 太郎"
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

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center gap-2 ${isSaving ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                }`}
                        >
                            <Save className="h-5 w-5" />
                            <span>{isSaving ? "保存中..." : "基本情報を保存"}</span>
                        </button>
                    </form>
                </div>

                {/* パスワード変更セクション */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">パスワード変更</h2>
                        <button
                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                            className="text-sm text-purple-600 hover:text-purple-800"
                        >
                            {isChangingPassword ? "キャンセル" : "パスワードを変更する"}
                        </button>
                    </div>

                    {isChangingPassword && (
                        <>
                            {passwordError && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm">{passwordError}</p>
                                </div>
                            )}

                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        現在のパスワード
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="現在のパスワード"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        新しいパスワード
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="8文字以上"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? (
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
                                        新しいパスワード（確認）
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="新しいパスワードを再入力"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-md transition-colors flex items-center justify-center gap-2 ${isSaving ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                        }`}
                                >
                                    <Save className="h-5 w-5" />
                                    <span>{isSaving ? "保存中..." : "パスワードを変更"}</span>
                                </button>
                            </form>
                        </>
                    )}

                    {!isChangingPassword && (
                        <p className="text-sm text-gray-600">
                            セキュリティのため、定期的にパスワードを変更することをおすすめします。
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage
