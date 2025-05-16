FactoryBot.define do
  factory :stage do
    association :festival
    name { "Main Stage" }
  end
end
