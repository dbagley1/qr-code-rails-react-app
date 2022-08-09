Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  resources :qr_codes

  resources :projects
  delete "/projects/:id/leave", to: "projects#leave"
  post "/projects/:id/users/:username", to: "projects#add_user"
  delete "/projects/:id/users/:username", to: "projects#remove_user"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
