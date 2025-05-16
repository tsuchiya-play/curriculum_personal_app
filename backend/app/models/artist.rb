class Artist < ApplicationRecord
  belongs_to :genre
  has_many :performances, dependent: :destroy

  validates :name, presence: true
end
