#!/usr/bin/env ruby
u = User.first

t = PersonalAccessToken.new({ user: u, name: 'gitbeaker', scopes: ['api']}) 
t.save! 
 
puts t.token 
