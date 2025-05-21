class AddStartAndEndTimeToTimetables < ActiveRecord::Migration[7.1]
  def change
    add_column :timetables, :start_time, :datetime
    add_column :timetables, :end_time, :datetime
  end
end
