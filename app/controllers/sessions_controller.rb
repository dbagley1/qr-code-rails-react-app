class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.slice(:id, :username, :image_url, :bio), status: :created
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
      session[:user_id] = nil
      render json: {}, status: 204
    else
      render json: {errors:['Not logged in']}, status: 401
    end
  end
end
