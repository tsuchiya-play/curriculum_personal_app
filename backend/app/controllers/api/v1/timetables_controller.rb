# app/controllers/api/v1/timetables_controller.rb
class Api::V1::TimetablesController < ApplicationController
  def show
    date = params[:date]

    stages = festival.stages
    performances = Performance
      .includes(:artist, :stage)
      .where(stage: stages)
      .where("DATE(start_time) = ?", date)

    render json: {
      id: festival.id,
      festival_id: festival.id,
      date: date,
      start_time: festival.start_time,
      end_time: festival.end_time,
      stages: stages.map { |s| { id: s.id, name: s.name } },
      artists: performances.map do |performance|
        {
          id: performance.artist.id,
          name: performance.artist.name,
          stage_id: performance.stage.id,
          start_time: performance.start_time.strftime("%H:%M"),
          end_time: performance.end_time.strftime("%H:%M"),
          color: "#" + Digest::MD5.hexdigest(performance.artist.name)[0..5]
        }
      end
    }
  end
end
