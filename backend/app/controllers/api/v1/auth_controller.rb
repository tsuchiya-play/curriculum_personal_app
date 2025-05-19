class Api::V1::AuthController < ApplicationController
  def me
    if @current_user
      render json: { user: { id: @current_user.id, email: @current_user.email } }
    else
      render json: { error: "未ログイン" }, status: :unauthorized
    end
  end
end
