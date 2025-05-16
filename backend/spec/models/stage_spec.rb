require 'rails_helper'

RSpec.describe Stage, type: :model do
  it "名前とフェスティバルがあれば有効であること" do
    expect(build(:stage)).to be_valid
  end

  it "名前がなければ無効であること" do
    stage = build(:stage, name: nil)
    expect(stage).not_to be_valid
  end
end
