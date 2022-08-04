# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(username: "admin", password: "pass1", password_confirmation: "pass1", bio: "I am the admin", image_url: "http://www.gravatar.com/")

10.times do |i|
  qr_code = QrCode.create(title: "Example #{i}", url: "http://example.com")
  user.qr_codes << qr_code
end
