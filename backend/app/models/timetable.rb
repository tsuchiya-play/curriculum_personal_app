class Timetable < ApplicationRecord
  belongs_to :user
  belongs_to :festival
  has_many :timetable_items, dependent: :destroy

  validates :title, presence: true
end
