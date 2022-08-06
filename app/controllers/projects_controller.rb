class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update destroy leave]
  before_action :set_user, only: %i[create update leave]

  # GET /projects
  def index
    user = User.find_by(id: session[:user_id])
    if user
      @projects = user.projects.sort_by(&:created_at).reverse
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
    if @user
      @project = @user.projects.create(project_params)
      if @project.save
        render json: @project, status: :created, location: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @user == @project.owner
      if @project.update(project_params)
        render json: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  # DELETE /projects/1/leave
  def leave
    if @user
      if @project
        if @project.users.include?(@user)
          if @user != @project.owner
            @project.users.delete(@user)
            render @project, notice: "You have left the project."
          else
            render @project, alert: "You are the owner, so you cannot leave the project. You can delete the project to remove it from your account."
          end
        else
          render json: { errors: ["You are not a member of this project."] }, status: 401
        end
      else
        render json: @project.errors, status: :not_found
      end
    else
      render json: { errors: ["You must be logged in."] }, status: 401
    end
  end

  def add_user
    new_user = User.find_by(id: params[:user_id])
    if @user && @user.id === @project.owner.id
      @project.users << new_user
      if @project.save
        render json: @project, status: :created
      else
        render json: @project.errors, status: :unprocessable_entity
      end
      render json: { errors: ["You must be the owner to add project collaborators."] }, status: 401
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  def set_user
    @user = User.find_by(id: session[:user_id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.permit(:project, :title, :collaborators)
  end
end
