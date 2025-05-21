class Api::V1::FestivalsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @festivals = Festival.includes(timetables: :user).all

    render json: @festivals.map { |festival|
      first_timetable = festival.timetables.min_by(&:created_at)
      created_by_name = first_timetable&.user&.name || "不明"

      festival.as_json(only: [:id, :name, :start_date, :end_date]).merge(createdBy: created_by_name)
    }
  end

  # POST /api/v1/festivals
  def create
    festival = Festival.new(festival_params)

    if festival.save
      render json: { festival: festival }, status: :created
    else
      render json: { error: festival.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def festival_params
    params.require(:festival).permit(:name, :start_date, :end_date, :description, :official_url)
  end
end
