import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, setCurrentUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/login");
  };

  render() {
    const { branding, auth } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            {branding}
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              {auth && (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              )}
              {auth ? (
                <li className="nav-item" onClick={this.handleLogout.bind(this)}>
                  <span className="nav-link" style={{ cursor: "pointer" }}>
                    Logout
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.defaultProps = {
  branding: "My App"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, setCurrentUser }
  )(Header)
);
