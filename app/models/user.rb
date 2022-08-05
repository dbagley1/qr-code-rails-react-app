class User < ApplicationRecord
  has_secure_password

  has_many :projects_users
  has_many :projects, through: :projects_users
  has_many :qr_codes
  has_many :shared_qr_codes, through: :projects, source: :qr_codes

  validates :username, presence: true, uniqueness: true
end
