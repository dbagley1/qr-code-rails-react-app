class QrCodesController < ApplicationController
  before_action :set_qr_code, only: %i[show update destroy]
  # before_action :set_project, only: %i[create update]
  # before_action :set_user, only: [:index, :create]

  # GET /qr_codes
  def index
    user = User.find_by(id: session[:user_id])
    if user
      qr_codes = user.all_qr_codes.sort_by(&:created_at).reverse
      render json: qr_codes
    else
      render json: { errors: ["You must be logged in."] }, status: 401
    end
  end

  # GET /qr_codes/1
  def show
    render json: @qr_code
  end

  # POST /qr_codes
  def create
    user = User.find_by(id: session[:user_id])
    if user
      @qr_code = user.qr_codes.create(qr_code_params)

      if @qr_code.save
        render json: @qr_code, status: :created, location: @qr_code
      else
        render json: { errors: @qr_code.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["You must be logged in."] }, status: :unauthorized
    end
  end

  # PATCH/PUT /qr_codes/1
  def update
    if @qr_code.update(qr_code_params)
      render json: @qr_code
    else
      render json: { errors: @qr_code.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /qr_codes/1
  def destroy
    @qr_code.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_qr_code
    @qr_code = QrCode.find(params[:id])
  end

  # def set_user
  #   @user = User.find_by(id: session[:user_id]) if session[:user_id]
  # end

  # def set_project
  #   @project = Project.find_by(id: params[:project])
  # end

  # Only allow a list of trusted parameters through.
  def qr_code_params
    params.permit(:qr_code, :title, :url, :color, :project_id)
  end
end
