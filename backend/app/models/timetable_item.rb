class TimetableItem < ApplicationRecord
  belongs_to :timetable

  validates :memo, length: { maximum: 500 }
end
