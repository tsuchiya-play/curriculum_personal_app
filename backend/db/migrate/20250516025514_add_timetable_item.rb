class AddTimetableItem < ActiveRecord::Migration[7.1]
  def change
    add_reference :timetable_items, :performance, null: false, foreign_key: true
  end
end
