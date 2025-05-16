FactoryBot.define do
  factory :artist do
    name { "Sample Artist" }
    description { "A great band." }
    association :genre
  end
end
