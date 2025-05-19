Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]

      get :csrf_token, to: "csrf#index"
      get :me, to: "auth#me"
    end
  end
end
