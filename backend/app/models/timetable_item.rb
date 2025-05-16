class TimetableItem < ApplicationRecord
  belongs_to :timetable
  belongs_to :performance
end
