class Api::V1::FestivalsController < ApplicationController
  skip_before_action :verify_authenticity_token

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
