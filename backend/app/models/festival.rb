class Festival < ApplicationRecord
  has_many :stages, dependent: :destroy
  has_many :performances, through: :stages
  has_many :timetables, dependent: :destroy

  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validate  :end_date_after_start_date

  private

  def end_date_after_start_date
    return if start_date.blank? || end_date.blank?
    if end_date < start_date
      errors.add(:end_date, "は開始日以降である必要があります")
    end
  end
end
