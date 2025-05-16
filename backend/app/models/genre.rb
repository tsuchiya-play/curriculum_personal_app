class Genre < ApplicationRecord
  has_many :artists

  validates :name, presence: true
end
