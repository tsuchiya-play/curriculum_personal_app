class Api::V1::SessionsController < ApplicationController
  # APIモードでもセッションとCSRFを使うための設定
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: -> { request.format.json? && !protect_against_forgery? }
  before_action :authenticate_user!, only: [:destroy]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      # セッションにユーザーIDを保存
      session[:user_id] = user.id

      render json: {
        message: 'ログイン成功',
        user: { id: user.id, email: user.email }
      }, status: :ok
    else
      render json: { error: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
    end
  end

  def destroy
    reset_session
    render json: { message: 'ログアウトしました' }, status: :ok
  end

  private

  def authenticate_user!
    unless session[:user_id]
      render json: { error: 'ログインしてください' }, status: :unauthorized
    end
  end
end
