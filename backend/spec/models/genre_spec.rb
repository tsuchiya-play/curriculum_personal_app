require 'rails_helper'

RSpec.describe Genre, type: :model do
  describe 'バリデーション' do
    it '名前があれば有効であること' do
      genre = build(:genre)
      expect(genre).to be_valid
    end

    it '名前がなければ無効であること' do
      genre = build(:genre, name: nil)
      expect(genre).not_to be_valid
      expect(genre.errors[:name]).to include('を入力してください')
    end
  end

  describe 'アソシエーション' do
    it '複数のアーティストを持つこと' do
      assoc = described_class.reflect_on_association(:artists)
      expect(assoc.macro).to eq :has_many
    end
  end
end
