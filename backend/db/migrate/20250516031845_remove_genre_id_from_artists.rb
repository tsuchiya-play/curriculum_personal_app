class RemoveGenreIdFromArtists < ActiveRecord::Migration[7.1]
  def change
    remove_column :artists, :genre_id, :integer
  end
end
