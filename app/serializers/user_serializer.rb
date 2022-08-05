class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :bio, :qr_codes

  has_many :projects

  def qr_codes
    self.object.qr_codes.concat(self.object.shared_qr_codes)
  end
end
