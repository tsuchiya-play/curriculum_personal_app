# ユーザー10名を作成
users = 10.times.map do |i|
  User.create!(
    name: "ユーザー#{i + 1}",
    email: "user#{i + 1}@example.com",
    password: "password",
    password_confirmation: "password"
  )
end

# フェス10件のデータ
festivals_data = [
  { name: "ROCK IN JAPAN FESTIVAL 2025", start_date: "2025-08-01", end_date: "2025-08-03", description: "日本最大級のロックフェス", official_url: "https://rijf.jp" },
  { name: "SUMMER SONIC 2025", start_date: "2025-08-15", end_date: "2025-08-16", description: "東京・大阪で開催される夏の都市型フェス", official_url: "https://www.summersonic.com" },
  { name: "FUJI ROCK FESTIVAL 2025", start_date: "2025-07-25", end_date: "2025-07-27", description: "自然に囲まれた野外ロックフェス", official_url: "https://www.fujirockfestival.com" },
  { name: "COUNTDOWN JAPAN 25/26", start_date: "2025-12-28", end_date: "2025-12-31", description: "年末のカウントダウンフェス", official_url: "https://countdownjapan.jp" },
  { name: "RISING SUN ROCK FESTIVAL 2025", start_date: "2025-08-10", end_date: "2025-08-11", description: "北海道の大自然で行われるロックフェス", official_url: "https://rsr.wess.co.jp" },
  { name: "METROCK 2025", start_date: "2025-05-11", end_date: "2025-05-12", description: "東京で開催される都市型ロックフェス", official_url: "https://metrock.jp" },
  { name: "ROCKS TOKYO 2025", start_date: "2025-06-05", end_date: "2025-06-07", description: "東京発の新鋭ロックフェス", official_url: "https://rockstokyo.jp" },
  { name: "NANBA ROCKS 2025", start_date: "2025-09-20", end_date: "2025-09-21", description: "大阪のロックフェス", official_url: "https://nanbarocks.jp" },
  { name: "SAKURA FESTIVAL 2025", start_date: "2025-04-03", end_date: "2025-04-05", description: "春の桜を楽しむフェス", official_url: "https://sakurafes.jp" },
  { name: "THE GREAT SATSUMANIAN HES 2025", start_date: "2025-05-20", end_date: "2025-05-22", description: "鹿児島で開催される人気フェス", official_url: "https://satsumanian.example.com" }
]

festivals_data.each_with_index do |festival_data, i|
  festival = Festival.create!(festival_data)

  # 各フェスにランダムなユーザーがタイムテーブル作成者として紐づく
  Timetable.create!(
    user: users.sample,
    festival: festival,
    title: "ユーザー#{i + 1}のタイムテーブル"
  )
end
