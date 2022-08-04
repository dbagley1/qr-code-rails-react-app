class CreateQrCodes < ActiveRecord::Migration[6.1]
  def change
    create_table :qr_codes do |t|
      t.string :title
      t.string :url
      t.belongs_to :user

      t.timestamps
    end
  end
end
