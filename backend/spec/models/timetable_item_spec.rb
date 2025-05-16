require 'rails_helper'

RSpec.describe TimetableItem, type: :model do
  describe 'バリデーションの確認' do
    it '有効なファクトリを持つこと' do
      expect(build(:timetable_item)).to be_valid
    end

    it 'timetable_id がなければ無効であること' do
      item = build(:timetable_item, timetable: nil)
      expect(item).not_to be_valid
      expect(item.errors[:timetable]).to include("を入力してください")
    end

    it "タイムテーブルとパフォーマンスがあれば有効であること" do
      expect(build(:timetable_item)).to be_valid
    end

    it "パフォーマンスがなければ無効であること" do
      item = build(:timetable_item, performance: nil)
      expect(item).not_to be_valid
    end
  end
end
