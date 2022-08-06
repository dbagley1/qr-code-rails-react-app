class ProjectsUser < ApplicationRecord
  belongs_to :user
  belongs_to :project

  after_create :set_owner

  def set_owner
    self.update_column(:owner, true) if ProjectsUser.where(project_id: self.project_id).length == 1
  end
end
