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

user.projects.create(title: Faker::Marketing.buzzwords.titleize, owner_id: user.id)
5.times do |i|
  domain = Faker::Internet.domain_name
  qr_code = user.qr_codes.create(title: "#{domain}", url: "http://#{domain}")
end
user.projects.first.qr_codes << user.qr_codes.last

project2 = user2.projects.create(title: Faker::Marketing.buzzwords.titleize, owner_id: user2.id)
5.times do |i|
  domain = Faker::Internet.domain_name
  qr_code = user2.qr_codes.create(title: "#{domain}", url: "http://#{domain}")
end
user2.projects.first.qr_codes << user2.qr_codes.last
user2.projects.first.users << user
