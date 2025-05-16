class CreateArtists < ActiveRecord::Migration[7.1]
  def change
    create_table :artists do |t|
      t.string :name
      t.text :description
      t.integer :genre_id

      t.timestamps
    end
  end
end
