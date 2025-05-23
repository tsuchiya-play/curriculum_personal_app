class AddColumnTimetables < ActiveRecord::Migration[7.1]
  def change
    add_column :timetables, :date, :date
  end
end
