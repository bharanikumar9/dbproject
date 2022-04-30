// import { Button } from 'react-bootstra';
import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import './login.css';
// import GlobalContext from './GlobalContext.js'
const axios = require('axios')

const Login = () => {
    // const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        axios
          .get('http://localhost:5000/fetch-user', {
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }).then(response => {
            if (response.status === 200) {
                // globalContext.setUser({})
                navigate('/')
            } else {
                throw new Error()
            }
            
        }).catch(err => console.log(err));
      }, [])
    

   

    const contactSubmit=(e)=> {
        e.preventDefault();
        console.log(formData);

        setLoading(true)
        axios
            .post('http://localhost:5000/login', formData, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.user)
                        
                    // globalContext.setUser(response.data.user)
    
                    console.log("RR")
                    navigate('/')
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                setError('Incorrect details')
            })
            .finally(() => {
                setLoading(false)

            })        
          }


        return (

            <div>

                <div id='vspace'></div>
                <div id='vspace'></div>

                <form name="contactform" className="contactform" onSubmit={contactSubmit.bind(this)}>

                    <div id="main">


                                    {error && error}

                        <fieldset>
                            <div id='vspace'></div>
                            {/* <div id='vspace'></div> */}
                            <div className="form-group">
                            <label style={{color:"black"}}> <strong>Username </strong></label>
<input type="text" size="30" className="form-control"
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    value={formData.username} />
                                <br />
                            </div>
                            <div id="vspace"></div>
                            <div className="form-group">
                            <label style={{color:"black"}}>
                                <strong>Password </strong></label>
                                <input className="form-control" type="text" size="30" onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                />
                               
                                <br />
                                </div>
                            <div id="vspace"></div>


                            {/* <Button style={{color:"black"}} id="submit"  value="Submit" loading = {loading}  variant="outline-secondary">Login</Button> */}

                            <button className="btn info" loading={loading} id="submit" value="Submit">
                                Login
                            </button>
                            <br />
                            <br />
                        </fieldset>
                        <div id="vspace"></div>




                    </div>

                </form>



                <style jsx>{`
                  
                body, html, .App, #root, .outer {
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    background-image: 
                    url(  "./v.png");
                    background-size: auto;
                    height: 100vh;
                
                }
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
                    // border-style: solid;
                    border-color: rgb(140, 166, 180);
                    // background-color: rgb(192,192,192);
                    background-image: 
                    url(  "./v.png");
                    box-shadow: 10px 10px Lightblue;
                    opacity: 1;
                    width: 500px;
                    height: 400px;
                    position: relative;
                    // transform: translateY(-50%);
                    top: 50%;
                
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

export default Login;  