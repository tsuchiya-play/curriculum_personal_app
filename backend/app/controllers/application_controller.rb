class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  before_action :set_csrf_cookie
  before_action :set_current_user

  private

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = {
      value: form_authenticity_token,
      same_site: :lax,
      secure: Rails.env.production?,
      httponly: false
    }
  end

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end
end
