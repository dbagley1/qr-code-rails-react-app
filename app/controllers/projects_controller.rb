class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update destroy]

  # GET /projects
  def index
    user = User.find_by(id: session[:user_id])
    if user
      @projects = user.projects
      render json: @projects
    else
      render json: { errors: ["You must be logged in."] }, status: 401
    end
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    user = User.find_by(id: session[:user_id])
    if user
      @project = user.projects.create(project_params)
      if @project.save
        render json: @project, status: :created, location: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.permit(:project, :title, :collaborators)
  end
end
