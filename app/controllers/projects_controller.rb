class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update destroy leave add_user]
  before_action :set_user, only: %i[create update leave add_user]

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
    if @user == @project.owner
      new_user = User.find_by(username: params[:username])
      if new_user
        project_user = ProjectsUser.where(project_id: @project.id, user_id: new_user.id).first_or_create
        if project_user.save
          render json: @project, status: :created
        else
          render json: @project.errors, status: :unprocessable_entity
        end
      else
        render json: { errors: ["Could not find user with username: #{params[:username]}."] }, status: 401
      end
    else
      render json: { errors: ["You must be the project owner to add collaborators."] }, status: 401
    end
  end

  def remove_user
    if @user == @project.owner
      remove_user = User.find_by(username: params[:username])
      if remove_user
        project_user = ProjectsUser.destroy_by(project_id: @project.id, user_id: remove_user.id)
        if project_user.length > 0
          render json: @project, status: 200
        else
          render json: { errors: ["User is not a collaborator on this project."] }, status: 404
        end
      else
        render json: { errors: ["Could not find user with username: #{params[:username]}."] }, status: 404
      end
    else
      render json: { errors: ["You must be the project owner to remove collaborators."] }, status: 401
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
