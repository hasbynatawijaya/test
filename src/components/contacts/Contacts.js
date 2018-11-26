import React, { Component } from "react";
import Contact from "./Contact";
import { connect } from "react-redux";
import { getContacts } from "../../actions/contactActions";

class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts, loading } = this.props;

    return (
      <React.Fragment>
        {loading && contacts ? (
          <div className="loader" >
          </div>
        ) : (
          <h1 className="display-4 mb-2">
            <span className="text-danger">React</span> API TEST Gadjian
          </h1>
        )}
        {contacts.map(contact => (
          <Contact key={contact.idk} contact={contact} loading={loading} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
  loading: state.async.loading
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
