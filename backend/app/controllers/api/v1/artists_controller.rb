# app/controllers/api/v1/artists_controller.rb
class Api::V1::ArtistsController < ApplicationController
  def index
    artists = Artist.all
    render json: artists
  end

  def show
    artist = Artist.find(params[:id])
    render json: artist
  end
end
