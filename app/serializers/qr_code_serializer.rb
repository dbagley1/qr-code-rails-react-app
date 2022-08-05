class QrCodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :created_at, :updated_at

  belongs_to :user
end
