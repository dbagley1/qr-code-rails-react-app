# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"

user = User.create(username: "Darrian", password: "pass1", password_confirmation: "pass1", bio: "I am the admin", image_url: "http://www.gravatar.com/")
user2 = User.create(username: "NotDarrian", password: "pass1", password_confirmation: "pass1", bio: "I am the admin", image_url: "http://www.gravatar.com/")

5.times do |i|
  domain = Faker::Internet.domain_name
  qr_code = QrCode.create(title: "#{domain}", url: "http://#{domain}")
  user.qr_codes << qr_code
end

5.times do |i|
  domain = Faker::Internet.domain_name
  qr_code = QrCode.create(title: "#{domain}", url: "http://#{domain}")
  user2.qr_codes << qr_code
end
