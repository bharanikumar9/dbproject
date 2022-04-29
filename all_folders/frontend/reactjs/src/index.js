import React, { useState, useEffect } from 'react'
import App from './App'
import ReactDOM from 'react-dom';
import { Navbar, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiThumbsUp, FiThumbsDown, FiUser } from "react-icons/fi"
import axios from 'axios';
export default function Home() {

  const fetchdata = async (api) => {
    const res = await fetch(api)
    const json = await res.json();
    return json
  }


  const [user_id, setuser_id] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:5000/fetch-user', {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }).then(res => {
        console.log(res)
        setuser_id(res.data[0].user_id)
        console.log("user_id")
        console.log(user_id)

        
    }).catch(err => console.log(err));
  }, [])



  return (
    <div >

      <div className="container">

        <Navbar className="fixed-top" bg="light" expand="lg" sticky="top" >
          <Container>
            <Navbar.Brand href="/" style={{ marginLeft: '20px' }}>Discussion Forum</Navbar.Brand>
            <Nav
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>

            <div className="float-right">
              <Button href="/questions/ask" variant="success">Ask a question</Button>
              &nbsp;
              <Button href="/logout" variant="secondary">Log out</Button>
              <Button variant="light"><a href={`/userprofile/${user_id}`}> <FiUser size="25px" /></a></Button>
              
              {/* ${info1.user_id} */}
              <div>




              </div>


            </div>

          </Container>

        </Navbar>
      </div>


      <div className="container">
        <ul className="sidebar">
          <li><a href='/'> <span>Home</span> </a></li>
          <li><a href='/questions'> <span>Questions</span> </a></li>
          <li><a href='/users'> <span>Users</span> </a></li>
          <li><a href='/tags'> <span>Tags</span> </a></li>
        </ul>
      </div>




      <style jsx>{`

          a:link{
            text-decoration: none!important;
          }

          .container {
            position: relative
          }
          .container .sidebar {
            padding-left: 0px;
            padding-top: 50px;
            position: fixed;
            height: 250px;
            width: 200px;
            z-index: 10;
            text-align: center;
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
          }
          .container .fixed-top {
            padding-left: 0px;
            position: fixed;
            height: 50px;
            z-index: 20;
            text-align: center;
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
          }


          .sidebar li:hover {
            padding: 30px 0px;
            background-color: transparent;
            color: #000
          }


          .sidebar li {
            padding: 12px;
            cursor: pointer;
            transition: all 0.5s;
            letter-spacing: 1px;
            display: flex;
            flex-direction: column
          }

          .sidebar li span {
            font-size: 15px
          }

          

          .sidebar li:hover {
            background-color: #f2f2f2;
            padding: 12px
          }

          .sidebar li a{
            text-decoration: none;
            color: black; 
          }

          .container .content {
            padding-left: 75px
          }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />


    </div>



  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);