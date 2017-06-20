class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
  end

  def import
    begin
      Contact.importCSV(params[:file])
      redirect_to root_url, notice: "Contacts imported sucessfully!"
    rescue
      redirect_to root_url, notice: "Invalid file"
    end
  end
  
  def delete
    # delete contact
    @contact = Contact.find(params[:id])
    @contact.destroy
    # return OK no content
    head 204
  end
end
