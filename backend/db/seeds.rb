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

# アーティスト
artists = 20.times.map do
  Artist.create!(
    name: Faker::JapaneseMedia::OnePiece.character,
    genre: genres.sample,
    description: "邦楽ロックシーンで活躍する人気バンド。"
  )
end

# フェス + ステージ + タイムテーブル + パフォーマンス
festivals = 5.times.map do
  start_date = Faker::Date.between(from: Date.today, to: Date.today + 10)
  end_date = start_date + rand(1..2).days

  festival = Festival.create!(
    name: Faker::Music::RockBand.name + " Fes",
    start_date: start_date,
    end_date: end_date,
    description: "日本の邦楽ロックを中心とした音楽フェスです。",
    official_url: Faker::Internet.url,
    created_at: Time.now,
    updated_at: Time.now
  )

  # ステージ（1〜5個）
  stages = rand(1..5).times.map do
    Stage.create!(
      name: "#{Faker::Color.color_name.capitalize} Stage",
      festival: festival
    )
  end

  # 日付ごとのタイムテーブル + パフォーマンス
  (start_date..end_date).each do |date|

    random_start_time = Faker::Time.between(
      from: Time.zone.local(date.year, date.month, date.day, 0, 0),
      to:   Time.zone.local(date.year, date.month, date.day, 10, 0)
    )

    random_end_time = Faker::Time.between(
      from: Time.zone.local(date.year, date.month, date.day, 21, 0),
      to:   Time.zone.local(date.year, date.month, date.day, 23, 59)
    )
    timetable = Timetable.create!(
      user: users.sample,
      festival: festival,
      title: "#{festival.name} #{date} Timetable",
      start_time: random_start_time,
      end_time: random_end_time,
      date: date.strftime("%F"),
      created_at: Time.now
    )

    # パフォーマンス（各ステージに1〜3件）
    stages.each do |stage|
      rand(1..3).times do
        range_start = timetable.start_time
        range_end = timetable.end_time - 45.minutes

        start_time = Faker::Time.between(from: range_start, to: range_end)
        Performance.create!(
          artist: artists.sample,
          stage: stage,
          start_time: start_time,
          end_time: start_time + 45.minutes
        )
      end
    end

    # タイムテーブルアイテム
    3.times do
      TimetableItem.create!(
        timetable: timetable,
        performance: Performance.order("RAND()").first,
        memo: "楽しみ！"
      )
    end
  end
end

puts "🌸 Seed completed with 邦楽ロックフェス！（24時間タイムテーブル対応済み）"
