class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at

  belongs_to :owner
  has_many :users
  has_many :qr_codes
end
