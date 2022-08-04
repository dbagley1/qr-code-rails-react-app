class QrCodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :url

  belongs_to :user
end
