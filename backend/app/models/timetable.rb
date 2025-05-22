class Timetable < ApplicationRecord
  belongs_to :user
  belongs_to :festival
  has_many :timetable_items, dependent: :destroy

  validates :title, presence: true

  validate :start_time_must_be_before_end_time_if_same_day

  private

  def start_time_must_be_before_end_time_if_same_day
    return if start_time.blank? || end_time.blank? || festival.blank?
    if :start_time < :end_time
      errors.add(:start_time, 'は end_time より前の時間でなければなりません')
    end
  end
end
