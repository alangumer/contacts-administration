class Contact < ActiveRecord::Base
  require 'csv'
    
  def self.importCSV(file)
    
    counter = 0
    
    CSV.foreach(file.path, headers: true) do |row|
      
      item = row.to_hash
      contact = Contact.where(email_address: item["Email Address"])
      
      # if contact does not exist and is a valid item add to the DB
      if (contact.count == 0 && item["Email Address"])
        Contact.create(first_name: item["First Name"], last_name: item["Last Name"], email_address: item["Email Address"], phone_number: item["Phone Number"], company_name: item["Company Name"])
        counter += 1
      end
    end
    
    puts "Imported #{counter} contacts"
    
  end
end
