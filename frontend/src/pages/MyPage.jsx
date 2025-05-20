"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Edit, Trash2, LogOut } from "lucide-react"

function MyPage({ onLogout, setUser, setLoginMessage}) {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/me", {
                    credentials: "include",
                })
                if (!response.ok) throw new Error("ユーザー情報の取得に失敗")

                const data = await response.json()
                setUserData(data.user)
            } catch (error) {
                console.error("ユーザーデータの取得に失敗しました", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [])

    // プロフィール更新ページへ移動
    const handleEditProfile = () => {
        navigate("/edit-profile")
    }

    // アカウント削除の確認ダイアログを表示
    const handleDeleteClick = () => {
        setShowDeleteConfirm(true)
    }

    // アカウント削除処理
    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/delete_profile", {
                method: "DELETE",
                credentials: "include",  // cookieなどの認証情報を送る場合
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "アカウント削除に失敗しました")
            }

            // 削除成功後にログアウト処理とトップページへ遷移
            setUser(null)
            setLoginMessage("")
            alert("アカウントが削除されました")
            setTimeout(() => navigate("/"), 100)
        } catch (error) {
            console.error("アカウントの削除に失敗しました", error)
            alert(error.message)
        } finally {
            setShowDeleteConfirm(false)
        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-purple-700 text-white p-4">
                    <h1 className="text-lg font-semibold">マイページ</h1>
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
            <header className="bg-purple-700 text-white p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">マイページ</h1>
                <button
                    onClick={() => navigate("/")}
                    className="text-sm bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-full"
                >
                    ホームへ戻る
                </button>
            </header>

            {/* プロフィール情報 */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <User className="h-12 w-12 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-1">{userData?.name}</h2>
                        <p className="text-gray-600">{userData?.email}</p>
                    </div>

                    {/* 操作ボタン */}
                    <div className="space-y-3">
                        <button
                            onClick={handleEditProfile}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Edit className="h-5 w-5" />
                            <span>プロフィールを更新</span>
                        </button>

                        <button
                            onClick={handleDeleteClick}
                            className="w-full py-3 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Trash2 className="h-5 w-5" />
                            <span>アカウントを削除</span>
                        </button>

                        <button
                            onClick={onLogout}
                            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>ログアウト</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 削除確認モーダル */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">アカウント削除の確認</h3>
                        <p className="mb-6 text-gray-600">
                            アカウントを削除すると、すべてのデータが完全に削除され、復元できなくなります。本当に削除しますか？
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                            >
                                削除する
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyPage
