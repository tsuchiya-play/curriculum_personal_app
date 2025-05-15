class CreateFestivals < ActiveRecord::Migration[7.1]
  def change
    create_table :festivals do |t|
      t.string :name
      t.date :start_date
      t.date :end_date
      t.text :description
      t.string :official_url

      t.timestamps
    end
  end
end
