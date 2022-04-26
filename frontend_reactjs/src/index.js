import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';
import { Navbar, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
  return (
    <div >

      <Navbar bg="light" expand="lg" sticky="top" >
        <Container>
          <Navbar.Brand href="#" style={{ marginLeft: '20px' }}>Discussion Forum</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Form style={{ position: 'center' }} className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>

      </Navbar>

      <div className="container">
        <ul className="sidebar">
          <li><span>Home</span></li>
          <li><a href='/questions'> <span>Questions</span> </a></li>
          <li><a href='/users'> <span>Users</span> </a></li>
          <li><a href='/tags'> <span>Tags</span> </a></li>
        </ul>
      </div>




      <style jsx>{`

          .container {
            position: relative
          }
          .container .sidebar {
            padding-left: 0px;
            position: fixed;
            height: 200px;
            width: 200px;
            z-index: 10;
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
