class AddProjectToQrCodes < ActiveRecord::Migration[7.0]
  def change
    add_reference :qr_codes, :project, optional: true, foreign_key: true
  end
end
