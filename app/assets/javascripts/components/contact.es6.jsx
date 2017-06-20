class Contact extends React.Component {
  render () {
    
    return (
      <tr>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.emailAddress}</td>
        <td>{this.props.phoneNumber}</td>
        <td>{this.props.companyName}</td>
        <td><a href="javascript:void(0)" onClick={() => this.props.onDelete(this.props.id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
      </tr>
    );
  }
}

Contact.propTypes = {
  id: React.PropTypes.number,
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  emailAddress: React.PropTypes.string,
  phoneNumber: React.PropTypes.string,
  companyName: React.PropTypes.string,
  onDelete: React.PropTypes.func
};

