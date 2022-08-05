class QrCodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :color, :project, :created_at, :updated_at

  belongs_to :user
end
