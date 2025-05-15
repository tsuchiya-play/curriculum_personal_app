# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it '名前、メール、パスワードがある場合、有効である' do
      user = User.new(
        name: 'テストユーザー',
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password'
      )
      expect(user).to be_valid
    end

    it '名前が空だと無効である' do
      user = User.new(name: '', email: 'test@example.com', password: 'password')
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("を入力してください")
    end

    it 'メールが空だと無効である' do
      user = User.new(name: 'テスト', email: '', password: 'password')
      expect(user).not_to be_valid
    end

    it 'メールが重複していると無効である' do
      User.create!(name: '一人目', email: 'test@example.com', password: 'password')
      user = User.new(name: '二人目', email: 'test@example.com', password: 'password')
      expect(user).not_to be_valid
    end

    it 'パスワードが6文字未満だと無効である' do
      user = User.new(name: '短いパスワード', email: 'short@example.com', password: '123')
      expect(user).not_to be_valid
    end
  end
end
