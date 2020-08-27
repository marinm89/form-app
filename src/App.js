import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      number: null,
      address:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        address:"",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Address: ${this.state.address}
        Email: ${this.state.email}
        Number: ${this.state.number}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 1 ? "Required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 1 ? "Required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? "": "Invalid email address";
        break;
      case "address":
        formErrors.address =
          value.length ==0 ? "Required" :'';
        break;
      case "number":
        formErrors.number =
          value.length ==0 ? "Required" : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>User Data</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="Address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>

            <div className="number">
              <label htmlFor="number">Phone Number</label>
              <input
                className={formErrors.number.length > 0 ? "error" : null}
                placeholder="Phone number"
                type="number"
                name="phoneNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.number.length > 0 && (
                <span className="errorMessage">{formErrors.number}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            
            <div className="createAccount">
              <button type="submit">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
