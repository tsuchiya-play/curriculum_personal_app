class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token  # SPAとの連携用（セキュリティ考慮して調整）

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'アカウントが作成されました' }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
