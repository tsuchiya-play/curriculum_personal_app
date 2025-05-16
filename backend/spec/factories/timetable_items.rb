FactoryBot.define do
  factory :timetable_item do
    association :timetable
    association :performance
    memo { "Don't miss this!" }
  end
end
