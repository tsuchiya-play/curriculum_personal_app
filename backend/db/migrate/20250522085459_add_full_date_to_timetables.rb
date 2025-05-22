class AddFullDateToTimetables < ActiveRecord::Migration[7.1]
  def change
    add_column :timetables, :date, :string
  end
end
