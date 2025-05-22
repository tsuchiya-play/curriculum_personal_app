Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      patch :update_profile, to: 'users#update_profile'
      patch :password, to: 'users#update_password'
      delete :delete_profile, to: 'users#destroy'

      resource :session, only: [:create, :destroy]

      resources :festivals, only: [:index, :create, :show] do
        resource :timetable, only: [:edit, :update, :show, :destory]
        resources :performances
      end
      resources :artists

      get :csrf_token, to: "csrf#index" # 認証用ルート
      get :me, to: "auth#me"
    end
  end
end
