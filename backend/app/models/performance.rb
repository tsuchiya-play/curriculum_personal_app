class Performance < ApplicationRecord
  belongs_to :artist
  belongs_to :stage
  has_many :timetable_items, dependent: :destroy

  validates :start_time, :end_time, presence: true
  validate :end_time_after_start_time

  private

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    if end_time <= start_time
      errors.add(:end_time, "は開始時間より後でなければなりません")
    end
  end
end
