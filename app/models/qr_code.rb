class QrCode < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :url, presence: true
end
