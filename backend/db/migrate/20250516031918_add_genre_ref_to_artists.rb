class AddGenreRefToArtists < ActiveRecord::Migration[7.1]
  def change
    add_reference :artists, :genre, null: false, foreign_key: true
  end
end
