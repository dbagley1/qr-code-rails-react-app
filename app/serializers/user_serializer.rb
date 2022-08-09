class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name, :image_url, :owned_projects

  has_many :projects
  has_many :qr_codes

  def owned_projects
    object.projects_users.where(owner: true).map { |p| p.project.id }
  end
end
