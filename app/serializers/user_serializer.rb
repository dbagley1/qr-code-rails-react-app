class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :bio

  has_many :projects
  has_many :qr_codes
end
