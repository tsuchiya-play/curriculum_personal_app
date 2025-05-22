class ChangeColumnTimetables < ActiveRecord::Migration[7.1]
  def change
    change_column :timetables, :date, :datetime
  end
end
