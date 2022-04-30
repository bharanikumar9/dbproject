import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

//@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

function Add_User() {
  const fetchdata = async (api) => {
    const res = await fetch(api)
    const json = await res.json();
    return json
  }




  const navigate = useNavigate();

  const [Username, setName] = useState('');
  const [Confirm_Password, setPassword2] = useState('');
  const [Password, setPassword] = useState('');
  const [Age, setAge] = useState('');
  const [About, setAbout] = useState('');

  const [Location, setLocation] = useState('');
  const [Is_instuctor, setIs_instuctor] = useState(0);


  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  // Handling the name change
  const handleUserName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
    setSubmitted(false);
  };
  const handleAbout = (e) => {
    setAbout(e.target.value);
    setSubmitted(false);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
    setSubmitted(false);
  };
  const handleIs_Instructor = (e) => {
    if (e.target.value == 'Student') {
      setIs_instuctor(0);
    }
    else setIs_instuctor(1);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError2(false);
    setError(false);
    if (Username === '' || Password === '' || Confirm_Password === '' || Age === '' || Location === '') {
      setError(true);
    }
    else if (Password !== Confirm_Password) {
      setError2(true);
    }
    else {
      setSubmitted(true);
      setError(false);
      var data = { display_name: Username, password: Password, age: Age, location: Location, about: About, is_instructor: Is_instuctor }
      console.log(data)
      axios.post('http://localhost:5000/register', data, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data)
            navigate("/")

          } else {
            throw new Error()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  };


  // Showing success message
  const successMessage = () => {
    // alert("User "+Username+" successfully registered!!");
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>

      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };



  const errorMessage2 = () => {
    return (
      <div
        className="error"
        style={{
          display: error2 ? '' : 'none',
        }}>
        <h1>Passwords don't match</h1>
      </div>
    );
  };
  return (
    <div class="colorfull">
      <div id='vspace'></div>
      <div id='vspace'></div>
      <div className="form">

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
          {errorMessage2()}
        </div>

        <form>
          <h3>Register</h3>

          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Username" onChange={handleUserName}
              value={Username} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={handlePassword}
              value={Password} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm Password" onChange={handlePassword2}
              value={Confirm_Password} />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" className="form-control" placeholder="Age" onChange={handleAge}
              value={Age} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" placeholder="Location" onChange={handleLocation}
              value={Location} />
          </div>
          <div className="form-group">
            <label>About</label>
            <input type="text" className="form-control" placeholder="About" onChange={handleAbout} />
          </div>

          <label>
            Role
            <br />
            <input list="ice-cream-flavors" className="form-control" placeholder="Role" onChange={handleIs_Instructor} name="ice-cream-choice" size="90" />
            <datalist id="ice-cream-flavors">

              <option value="Student" />
              <option value="Instructor" />

            </datalist>

          </label>

          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <button onClick={handleSubmit} className="btn info" type="submit">
            Register
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/login">log in?</a>
          </p>
        </form>
      </div>

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
              form {
                border-style: solid;
                background-color:  rgb(140, 166, 180);
                opacity: 0.7;
                width: 600px
              
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
                opacity:2;
              }
              
              .info:hover {
                background: #2196F3;
                color: white;
              }
              
            `}</style>

    </div>
  )
}


export default Add_User;