"use client"
import { Music, User, LogIn } from "lucide-react"

function Header({ isLoggedIn, toggleLogin }) {
    return (
        <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Music className="h-6 w-6" />
                <span className="font-bold text-lg">フェスタイム</span>
            </div>

            <button
                onClick={toggleLogin}
                className="flex items-center gap-1 bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded-full text-sm"
            >
                {isLoggedIn ? (
                    <>
                        <User className="h-4 w-4" />
                        <span>マイページ</span>
                    </>
                ) : (
                    <>
                        <LogIn className="h-4 w-4" />
                        <span>ログイン</span>
                    </>
                )}
            </button>
        </header>
    )
}

export default Header
