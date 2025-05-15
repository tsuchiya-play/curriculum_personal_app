FactoryBot.define do
  factory :festival do
    name { "Fuji Rock" }
    start_date { Date.today }
    end_date { Date.today + 1 }
    description { "日本最大級の音楽フェス" }
    official_url { "https://fujirockfestival.com" }
  end
end
