# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"

qr_count = 5
usernames = %w[DarrianB JohnD JaneD ShelbyT DeshB]
displaynames = ["Darrian Bagley", "John Doe", "Jane Doe", "", ""]
colors = %w[4285f4 5AAA95 F47543 7842F5]

usernames.each_with_index do |username, i|
  bgColor = colors[i % colors.length]
  initials = "#{username.first}#{username.last}"
  img_url = "https://ui-avatars.com/api/?background=#{bgColor}&color=fff&name=#{initials}"
  User.create(username: username, password: "pass1", image_url: img_url, display_name: displaynames[i])
end

user = User.first
user2 = User.second

domains = %w[
  SCF.edu/Training
  SCF.edu/Bootcamps
  SCF.edu/CollegeEnglish
  SCF.edu/HealthCareerFair
  SCF.edu/ComputerClasses
  SCF.edu/WorkforceDevelopment
  SCF.edu/Coding
  SCF.edu/CodingCamps
  SCF.edu/Certifications
  SCF.edu/LifelongLearning
]

projectNames = ["Coding Academy", "Summer Camps 2022"]

qr_count.times { |i| qr_code = user.qr_codes.create(title: "#{domains[i]}", url: "http://#{domains[i]}") }

proj = user.projects.create(title: projectNames[0])
proj.qr_codes << user.qr_codes.slice(qr_count - 2, qr_count - 1)

qr_count.times { |i| qr_code = user2.qr_codes.create(title: "#{domains[qr_count + i]}", url: "http://#{domains[qr_count + i]}") }

proj2 = user2.projects.create(title: projectNames[1])
proj2.qr_codes << user2.qr_codes.slice(0, 2)
proj2.users << user
