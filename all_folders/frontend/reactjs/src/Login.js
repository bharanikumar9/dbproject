import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import Home from '.';
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
                {/* <Home /> */}
                <div id='vspace'></div>
                <div id='vspace'></div>

                <form name="contactform" className="contactform" onSubmit={contactSubmit.bind(this)}>

                    <div id="main">
                        <img src="logo1.png" alt="Discussion logo" width="128" height="128" />


                                    {error && error}

                        <fieldset>
                            <div id='vspace'></div>
                            <div id='vspace'></div>
                            <label>
                                USERNAME: <input type="text" size="30"
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    value={formData.username} />
                                <br />
                            </label>
                            <div id="vspace"></div>

                            <label>
                                PASSWORD: <input type="text" size="30" onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                />
                               
                                <br />
                            </label>
                            <div id="vspace"></div>




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

export default Login;  