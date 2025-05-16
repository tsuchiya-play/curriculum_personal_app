require 'rails_helper'

RSpec.describe Performance, type: :model do
  it "アーティスト、ステージ、開始時間、終了時間があれば有効であること" do
    expect(build(:performance)).to be_valid
  end

  it "開始時間がなければ無効であること" do
    performance = build(:performance, start_time: nil)
    expect(performance).not_to be_valid
  end
end
