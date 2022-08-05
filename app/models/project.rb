class Project < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_many :projects_users
  has_many :users, through: :projects_users
  has_many :qr_codes

  validates :title, presence: true
  validates :owner_id, presence: true
end
