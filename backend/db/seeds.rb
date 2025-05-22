require 'faker'
require 'date'
require 'time'

# 初期化
TimetableItem.delete_all
Timetable.delete_all
Performance.delete_all
Stage.delete_all
Artist.delete_all
Genre.delete_all
Festival.delete_all
User.delete_all

# ジャンル
genres = [
  "J-Rock", "Indie", "Pop Rock", "Alternative", "Visual Kei",
  "Punk", "Folk Rock", "Electro Rock", "Metal", "Hip Hop"
].map do |name|
  Genre.create!(name: name)
end

# ユーザー
users = 10.times.map do
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: "password",
    avatar_url: Faker::Avatar.image,
    created_at: Time.now,
    updated_at: Time.now
  )
end

# フェス
festivals = 10.times.map do
  start_date = Faker::Date.between(from: Date.today, to: Date.today + 10)
  end_date = start_date + rand(1..2).days

  Festival.create!(
    name: Faker::Music::RockBand.name + " Fes",
    start_date: start_date,
    end_date: end_date,
    description: "日本の邦楽ロックを中心とした音楽フェスです。",
    official_url: Faker::Internet.url,
    created_at: Time.now,
    updated_at: Time.now
  )
end

# アーティスト
artists = 10.times.map do
  Artist.create!(
    name: Faker::JapaneseMedia::OnePiece.character,
    genre: genres.sample,
    description: "邦楽ロックシーンで活躍する人気バンド。"
  )
end

# ステージ
stages = festivals.flat_map do |festival|
  3.times.map do
    Stage.create!(
      name: "#{Faker::Color.color_name.capitalize} Stage",
      festival: festival
    )
  end
end

# パフォーマンス
performances = stages.flat_map do |stage|
  3.times.map do
    start_time = Faker::Time.forward(days: 5, period: :day)
    Performance.create!(
      artist: artists.sample,
      stage: stage,
      start_time: start_time,
      end_time: start_time + 45.minutes
    )
  end
end

timetables = []

festivals.each do |festival|
  (festival.start_date..festival.end_date).each do |date|
    timetables << Timetable.create!(
      user: users.sample,
      festival: festival,
      title: "#{festival.name} #{date} Timetable",
      start_time: "10:00",
      end_time: "21:00",
      date: date.strftime("%-m-%-d"),
      created_at: Time.now
    )
  end
end

# タイムテーブルアイテム
timetables.each do |timetable|
  3.times do
    TimetableItem.create!(
      timetable: timetable,
      performance: performances.sample,
      memo: "楽しみ！"
    )
  end
end

puts "🌸 Seed completed with 邦楽ロックフェス！（date 対応済み）"
