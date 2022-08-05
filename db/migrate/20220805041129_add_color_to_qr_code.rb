class AddColorToQrCode < ActiveRecord::Migration[7.0]
  def change
    add_column :qr_codes, :color, :string
  end
end
