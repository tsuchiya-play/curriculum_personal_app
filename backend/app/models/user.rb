class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false },
                    length: { maximum: 255 }

  validates :password, presence: true, length: { minimum: 8 }, if: :password_required?

  private

  def password_required?
    new_record? || password.present?
  end

end