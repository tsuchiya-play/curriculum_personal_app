class Stage < ApplicationRecord
  belongs_to :festival
  has_many :performances, dependent: :destroy

  validates :name, presence: true
end
