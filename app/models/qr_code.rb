class QrCode < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :title, presence: true
  validates :url, presence: true
end
