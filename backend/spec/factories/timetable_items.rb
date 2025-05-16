FactoryBot.define do
  factory :timetable_item do
    association :timetable
    memo { "楽しみなライブ！" }
  end
end
