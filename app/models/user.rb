class User < ApplicationRecord
  has_secure_password

  has_many :projects_users
  has_many :projects, through: :projects_users, source: :project, dependent: :destroy
  has_many :qr_codes, dependent: :destroy
  has_many :shared_qr_codes, through: :projects, source: :qr_codes

  validates :username, presence: true, uniqueness: true

  after_create :set_image_url

  def set_image_url
    if self.image_url.blank?
      bgColor = %w[4285f4 5AAA95 F47543 7842F5].sample
      img_url = "https://ui-avatars.com/api/?background=#{bgColor}&color=fff&name=#{self.username.first}"
      self.update_column(:image_url, img_url)
    end
  end

  def all_qr_codes
    (self.qr_codes + self.shared_qr_codes).uniq
  end
end
