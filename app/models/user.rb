class User < ApplicationRecord
  has_secure_password

  has_many :projects_users
  has_many :projects, through: :projects_users, source: :project, dependent: :destroy
  has_many :qr_codes, dependent: :destroy
  has_many :shared_qr_codes, through: :projects, source: :qr_codes

  validates :username, presence: true, uniqueness: true

  def all_qr_codes
    (self.qr_codes + self.shared_qr_codes).uniq
  end
end
