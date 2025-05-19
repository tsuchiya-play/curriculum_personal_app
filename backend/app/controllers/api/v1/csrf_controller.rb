class Api::V1::CsrfController < ApplicationController
  def index
    render json: { csrf_token: form_authenticity_token }
  end
end
