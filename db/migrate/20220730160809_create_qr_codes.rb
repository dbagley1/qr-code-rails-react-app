class CreateQrCodes < ActiveRecord::Migration[6.1]
  def change
    create_table :qr_codes do |t|
      t.string :title
      t.string :url
      t.string :color
      t.belongs_to :user
      t.belongs_to :project

      t.timestamps
    end
  end
end
