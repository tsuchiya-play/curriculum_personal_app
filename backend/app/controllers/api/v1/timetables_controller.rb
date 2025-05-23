# app/controllers/api/v1/timetables_controller.rb
class Api::V1::TimetablesController < ApplicationController
  def show
    festival = Festival.includes(stages: :performances).find(params[:festival_id])
    date = params[:date]

    timetable = festival.timetables.find_by(date: date)
    stages = festival.stages
    performances = Performance
      .includes(:artist, :stage)
      .where(stage_id: stages.ids)
      .where("DATE(start_time) = ?", date)


    render json: {
      festival_id: festival.id,
      date: date,
      start_date: festival.start_date,
      end_date: festival.end_date,
      timetables:{
        start_time: timetable.start_time.strftime("%H:%M"),
        end_time: timetable.end_time.strftime("%H:%M"),
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
    }
  end
end
