import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';
import { Navbar, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Logout() {
    return (
        <div>
            <div className="container">

                <Navbar className="fixed-top" bg="light" expand="lg" sticky="top" >
                    <Container>
                        <Navbar.Brand href="#" style={{ marginLeft: '20px' }}>Discussion Forum</Navbar.Brand>
                        <Nav
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>

                        <div className="float-right">
                            <Button href="/register" variant="success">Register new</Button>
                            &nbsp;
                            <Button href="/login" variant="secondary">Login</Button>
                        </div>
                    </Container>

                </Navbar>

                <div className="container-body" style={{ textAlign: 'center' }}>
                    <img src="logout.png" width="100%" height="650" alt="Discussion logo" />
                    <div id='vspace'></div>

                    <h1>Join the community</h1>
                </div>
            </div>

            <style jsx>{`

                #vspace{
                    height: 0px;
                }


                h1, h2, h3, h4{
                    text - align: center;
                }
                .container-body{
                    padding-top: 0px;
                    padding-bottom: 0px;

                    // position: fixed;
                    z-index: 10;
                    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
                }

                main{
                    text - align: center;
                    z - index: 1;
                }
                a{
                    text - decoration: none;
                }
                .boxed {
                    z - index: 1;
                    width: 800px;
                    padding: 40px;
                    text - align: center;
                } 
                .boxhead {
                    text - decoration: none;
                }
                left {
                    z - index: 2;
                    background - color: rgb(179, 179, 179);
                    position: fixed;
                    left: 10px;
                    bottom: 20px;
                }
                right {
                    z - index: 2;
                    background - color: rgb(179, 179, 179);
                    position: fixed;
                    right: 10px;
                    bottom: 20px;
                }
                

                .btn:hover {
                    color: black;
                }
                `}</style>

        </div >
    )
}

export default Logout;