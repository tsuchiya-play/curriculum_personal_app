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

def show
  festival = Festival
    .left_joins(timetables: :user)
    .select(
      'festivals.*',
      'COALESCE(users.name, \'不明\') AS created_by',
      'users.id AS created_by_id'
    )
    .find_by(id: params[:id])

  return render json: { error: 'Festival not found' }, status: :not_found unless festival

  render json: {
    id: festival.id,
    name: festival.name,
    start_date: festival.start_date,
    end_date: festival.end_date,
    description: festival.description,
    official_url: festival.official_url,
    updated_at: festival.updated_at,
    createdBy: festival.attributes['created_by'],
    createdById: festival.attributes['created_by_id']
  }
end

  private

  def festival_params
    params.require(:festival).permit(:name, :start_date, :end_date, :description, :official_url)
  end
end
