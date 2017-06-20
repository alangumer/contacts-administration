class Contacts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {contacts: this.props.contacts};
    this.allContacts = JSON.parse(JSON.stringify(this.state.contacts));
  }
  
  render () {
    // delete specific contact via ajax
    const handleDelete = (id) => {
      if ( confirm("Are you sure?") ) {
        let _self = this;
        
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          
          if (this.readyState == 4 && this.status == 204) {
            // update state
            _self.setState((prevState) => {
              return {contacts: _self.state.contacts.filter((contact) => contact.id !== id)};
            });
            // update allContacts array
            _self.allContacts = JSON.parse(JSON.stringify(_self.state.contacts));
          }
          
        };
        xhttp.open("DELETE", "contacts/" + id + "/delete", true);
        xhttp.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
        xhttp.send();
      }
      
    };
    
    // show all the contacts -- without filters
    const showAll = () => {
      this.setState((prevState) => {
        return {contacts: JSON.parse(JSON.stringify(this.allContacts))};
      });
    };
    
    // filter contacts by email
    const filterByEmail = () => {
      this.setState((prevState) => {
        return {contacts: this.state.contacts.filter((contact) => /\S+\.com$/.test(contact.email_address))};
      });
    };
    
    // order contacts alphabetically
    const orderAlphabetically = () => {
      
      this.setState((prevState) => {
        return {contacts: this.state.contacts.sort((a, b) => {
          let emailA = a.email_address.toUpperCase();
          let emailB = b.email_address.toUpperCase();
          if (emailA < emailB) {
            return -1;
          }
          if (emailA > emailB) {
            return 1;
          }
          return 0;
        })};
      });
    };
    
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 text-right" style={{marginBottom: '10px'}}>
            <label>Filters: &nbsp;</label>
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={showAll}>All</button>
              <button type="button" className="btn btn-default" onClick={filterByEmail}>.com email</button>
              <button type="button" className="btn btn-default" onClick={orderAlphabetically}>Order Alphabetically</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
              {
                this.state.contacts.map((contact) => 
                  <Contact key={contact.email_address} id={contact.id} firstName={contact.first_name} lastName={contact.last_name} emailAddress={contact.email_address} phoneNumber={contact.phone_number} companyName={contact.company_name} onDelete={handleDelete}/>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: React.PropTypes.array
};
