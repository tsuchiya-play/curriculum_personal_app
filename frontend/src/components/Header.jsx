"use client"
import { Music, User, LogIn } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate()

    return (
        <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <Music className="h-6 w-6" />
                <span className="font-bold text-lg">フェスタイム</span>
            </div>

            {isLoggedIn ? (
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate("/my-page")}
                        className="flex items-center gap-1 bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-full text-sm"
                    >
                        <User className="h-4 w-4" />
                        <span>マイページ</span>
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1 bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-full text-sm"
                    >
                        <span>ログアウト</span>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-1 bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-full text-sm"
                >
                    <LogIn className="h-4 w-4" />
                    <span>ログイン</span>
                </button>
            )}
        </header>
    )
}

export default Header
