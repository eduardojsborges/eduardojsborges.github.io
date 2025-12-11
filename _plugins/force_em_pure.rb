# _plugins/force_em_pure.rb
begin
  require "em/pure_ruby"
rescue LoadError
  # If this fails we'll fall back to the default behavior
end
