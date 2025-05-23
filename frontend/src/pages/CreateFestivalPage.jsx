"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, LinkIcon, FileText, Music, AlertCircle, CheckCircle } from "lucide-react"

function CreateFestivalPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        officialUrl: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [submitError, setSubmitError] = useState([])

    // 入力値の変更を処理
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // フォーム送信
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitError([])

        setIsSubmitting(true)

        try {
            const response = await fetch("http://localhost:3000/api/v1/festivals", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    festival: {
                        name: formData.name,
                        start_date: formData.startDate,
                        end_date: formData.endDate,
                        description: formData.description,
                        official_url: formData.officialUrl,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessages =
                    data.errors?.full_messages?.join(",") || data.error || "フェスの作成に失敗しました。";
                setSubmitError(Array.isArray(errorMessages) ? errorMessages : [errorMessages]);
                setIsSubmitting(false);
                return;
            }

            // 成功時の処理
            setIsSuccess(true)
            setIsSubmitting(false)

            // 3秒後にフェス一覧ページへリダイレクト
            setTimeout(() => {
                navigate("/festivals")
            }, 3000)
        } catch (error) {
            setSubmitError(["通信エラーが発生しました。"])
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* ヘッダー */}
            <header className="bg-purple-700 text-white p-4 flex items-center">
                <button onClick={() => navigate("/")} className="mr-2 p-1 rounded-full hover:bg-purple-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">フェスを作成</h1>
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 p-6">
                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">フェスを作成しました！</h2>
                        <p className="text-gray-600 mb-8">フェス一覧ページに移動します...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-6 text-center text-purple-800">新しいフェスを作成</h2>

                        {submitError.length > 0 && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm font-semibold">入力内容に問題があります:</p>
                                </div>
                                <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                                    {submitError.map((msg, idx) => (
                                        <li key={idx}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* フェス名 */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    フェス名 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Music className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="例: マイフェス 2025"
                                    />
                                </div>
                            </div>

                            {/* 開始日と終了日 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        開始日 <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="startDate"
                                            name="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        終了日 <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="endDate"
                                            name="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 概要 */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    概要（任意）
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="フェスの概要や特徴を入力してください"
                                    ></textarea>
                                </div>
                            </div>

                            {/* 公式URL（任意） */}
                            <div>
                                <label htmlFor="officialUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                    公式URL（任意）
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="officialUrl"
                                        name="officialUrl"
                                        type="url"
                                        value={formData.officialUrl}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            {/* 送信ボタン */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-lg text-white font-medium shadow-md transition-colors ${isSubmitting ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {isSubmitting ? "作成中..." : "フェスを作成"}
                            </button>
                        </form>
                    </>
                )}
            </main>
        </div>
    )
}

export default CreateFestivalPage
