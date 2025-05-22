class RemoveDataFromTimetables < ActiveRecord::Migration[7.1]
  def change
    remove_column :timetables, :date, :datetime
  end
end
