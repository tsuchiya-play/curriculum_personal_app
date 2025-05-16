require 'rails_helper'

RSpec.describe Artist, type: :model do
  describe 'バリデーション' do
    it '名前とジャンルがあれば有効であること' do
      artist = build(:artist)
      expect(artist).to be_valid
    end

    it '名前がなければ無効であること' do
      artist = build(:artist, name: nil)
      expect(artist).not_to be_valid
      expect(artist.errors[:name]).to include('を入力してください')
    end
  end

  describe 'アソシエーション' do
    it 'ジャンルに属すること' do
      assoc = described_class.reflect_on_association(:genre)
      expect(assoc.macro).to eq :belongs_to
    end
  end
end
