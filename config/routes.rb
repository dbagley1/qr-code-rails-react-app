Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  resources :qr_codes

  resources :projects
  delete "/projects/:id/leave", to: "projects#leave"
  post "/projects/:id/users/:username", to: "projects#add_user"
  delete "/projects/:id/users/:user_id", to: "projects#remove_user"
  patch "/projects/:id/users/:user_id/:role", to: "projects#set_user_role"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
