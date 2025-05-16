FactoryBot.define do
  factory :timetable do
    association :user
    association :festival
    title { "マイフェス予定" }
  end
end
