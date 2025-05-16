require 'rails_helper'

RSpec.describe Festival, type: :model do
  describe 'バリデーション' do
    it '有効なファクトリであれば有効' do
      expect(build(:festival)).to be_valid
    end

    it '名前がなければ無効' do
      festival = build(:festival, name: nil)
      expect(festival).to_not be_valid
      expect(festival.errors[:name]).to include("を入力してください")
    end

    it '開始日がなければ無効' do
      festival = build(:festival, start_date: nil)
      expect(festival).to_not be_valid
    end

    it '終了日がなければ無効' do
      festival = build(:festival, end_date: nil)
      expect(festival).to_not be_valid
    end

    it '終了日が開始日より前だと無効' do
      festival = build(:festival, start_date: Date.today, end_date: Date.yesterday)
      expect(festival).to_not be_valid
      expect(festival.errors[:end_date]).to include("は開始日以降である必要があります")
    end
  end
end
