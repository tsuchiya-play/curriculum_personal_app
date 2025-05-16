class CreateTimetableItems < ActiveRecord::Migration[7.1]
  def change
    create_table :timetable_items do |t|
      t.references :timetable, null: false, foreign_key: true
      t.text :memo

      t.timestamps
    end
  end
end
