
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }



  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["Username"]) {
      formIsValid = false;
      errors["Username"] = "Cannot be empty";
    }

    if (typeof fields["Username"] !== "undefined") {
      if (!fields["Username"].match(/^[a-zA-Z0-9]+$/)) {
        formIsValid = false;
        errors["Username"] = "Invalid Format of Username";
      }
    }

    if (!fields["Password"]) {
      formIsValid = false;
      errors["Password"] = "Cannot be empty";
    }

    if (typeof fields["Password"] !== "undefined") {
      if (!fields["Password"].match(/^[0-9A-za-z!@#]+$/)) {
        formIsValid = false;
        errors["Password"] = "Password must contain atleast one lower case , one upper case, special character";////////////////////////////
      }
    }

    

    
    

  





    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    // console.log(this.state.fields);

    if (this.handleValidation()) {
      fetch('http://localhost:5000/Signup', {  // Enter your IP address here
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.state.fields)
      })
      alert("Successfully logged in");
      <a href='/'> <span>Home</span> </a>
      }
     else {
      alert("Form has errors.")
    }

  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <div id='vspace'></div>
        <div id='vspace'></div>

        <form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>

          <div id="main">
            <img src="logo1.png" alt="Discussion logo" width="128" height="128" />



            <fieldset>
              <div id='vspace'></div>
              <div id='vspace'></div>
              <label>
                USERNAME: <input type="text" size="30" onChange={this.handleChange.bind(this, "Username")} value={this.state.fields["Username"]} />
                <span className="error">{this.state.errors["Username"]}</span>
                <br />
              </label>
              <div id="vspace"></div>

              <label>
                PASSWORD: <input type="text" size="30" onChange={this.handleChange.bind(this, "Password")} value={this.state.fields["Password"]} />
                <span className="error">{this.state.errors["Password"]}</span>
                <br />
              </label>
              <div id="vspace"></div>

              

              
              <button className="btn info" id="submit" value="Submit">
              Login
              </button>
              <br />
              <br />
            </fieldset>
            <div id="vspace"></div>




          </div>

        </form>



        <style jsx>{`
              h3{
                  text-align: center;
              }
              .home{
                text-decoration: none;
              }
              #main{
                padding: 20px;
                margin: 0 auto;
                width: 50%;
                text-align: center;
                z-index: 1;
              }
              .error{
                margin-left: 5px;
                font-size: 13px;
                color: red;
              }
              #vspace {
                height: 30px;
              }
              .btn{
                padding: 10px;
                border: 1px solid #d8d8d8;
                background-color: #f9f9f9;
                border-radius: 3px;
              }
              .info {
                border-color: #2196F3;
                color: dodgerblue
              }
              
              .info:hover {
                background: #2196F3;
                color: white;
              }
              
            `}</style>

      </div>
    )
  }
}

export default Login;  