require 'rails_helper'

RSpec.describe Timetable, type: :model do
  describe 'バリデーションの確認' do
    it '有効なファクトリを持つこと' do
      expect(build(:timetable)).to be_valid
    end

    it 'user が存在しないと無効であること' do
      timetable = build(:timetable, user: nil)
      expect(timetable).not_to be_valid
      expect(timetable.errors[:user]).to include("を入力してください")
    end

    it 'festival が存在しないと無効であること' do
      timetable = build(:timetable, festival: nil)
      expect(timetable).not_to be_valid
      expect(timetable.errors[:festival]).to include("を入力してください")
    end

    it 'title が空だと無効であること' do
      timetable = build(:timetable, title: nil)
      expect(timetable).not_to be_valid
      expect(timetable.errors[:title]).to include("を入力してください")
    end
  end
end
