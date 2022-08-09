class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at

  has_many :users
  has_many :qr_codes
  has_many :owners
end
