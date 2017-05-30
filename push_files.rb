#!/usr/bin/ruby
require './ftp_sync.rb'

ftp_server = ENV['FTP_TARGET'] 
ftp_user = ENV['FTP_USER']
ftp_password = ENV['FTP_PASSWORD']

print("\n #{ftp_server}\n")
ftp = FtpSync.new(ftp_server, ftp_user, ftp_password, true)
ftp.sync('./_www', '/')