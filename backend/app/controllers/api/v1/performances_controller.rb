# app/controllers/api/v1/performances_controller.rb
class Api::V1::PerformancesController < ApplicationController
  def index
    performances = Performance.includes(:artist, :stage).all
    render json: performances.as_json(include: [:artist, :stage])
  end

  def show
    performance = Performance.find(params[:id])
    render json: performance.as_json(include: [:artist, :stage])
  end

  def create
    performance = Performance.new(performance_params)
    if performance.save
      render json: performance, status: :created
    else
      render json: { errors: performance.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    performance = Performance.find(params[:id])
    if performance.update(performance_params)
      render json: performance
    else
      render json: { errors: performance.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    performance = Performance.find(params[:id])
    performance.destroy
    head :no_content
  end

  private

  def performance_params
    params.require(:performance).permit(:artist_id, :stage_id, :start_time, :end_time)
  end
end
