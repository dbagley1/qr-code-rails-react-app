class CreateProjectsUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :projects_users do |t|
      t.references :user, foreign_key: true
      t.references :project, foreign_key: true
      t.boolean :owner, default: false

      t.timestamps
    end
  end
end
