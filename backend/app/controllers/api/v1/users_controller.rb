class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'アカウントが作成されました' }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/users/:id
  def update_profile
    user = @current_user
    if user.update(user_params)
      render json: { message: 'プロフィールが更新されました' }, status: :ok
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_password
    user = @current_user

    # 現在のパスワード確認
    unless user.authenticate(params[:current_password])
      return render json: { error: "現在のパスワードが正しくありません" }, status: :unauthorized
    end

    # パスワード更新
    if user.update(password: params[:new_password], password_confirmation: params[:new_password_confirmation])
      render json: { message: "パスワードが更新されました" }, status: :ok
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    permitted = [:name, :email]
    permitted += [:password, :password_confirmation] if params[:user][:password].present?
    params.require(:user).permit(permitted)
  end
end
