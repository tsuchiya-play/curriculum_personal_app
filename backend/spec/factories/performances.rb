FactoryBot.define do
  factory :performance do
    association :artist
    association :stage
    start_time { Time.current }
    end_time { 1.hour.from_now }
  end
end
