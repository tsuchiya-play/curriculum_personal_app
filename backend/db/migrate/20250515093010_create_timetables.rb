class CreateTimetables < ActiveRecord::Migration[7.0]
  def change
    create_table :timetables do |t|
      t.references :user, null: false, foreign_key: true
      t.references :festival, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
