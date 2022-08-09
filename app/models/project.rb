class Project < ApplicationRecord
  has_many :projects_users
  has_many :users, through: :projects_users
  has_many :qr_codes, dependent: :destroy
  has_many :owner_join, ->(projects_user) { where("owner", true) }, class_name: "ProjectsUser"
  has_many :owners, through: :owner_join, source: :user

  validates :title, presence: true
end
