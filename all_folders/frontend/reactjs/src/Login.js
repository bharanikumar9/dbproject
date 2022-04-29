import { Button } from 'reactstrap';

import { useState, useContext } from 'react'
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

    // const submitForm = () => {
    //     setLoading(true)
    //     axios
    //         .post(`${process.env.REACT_APP_BASE_URL}/login`, formData, {
    //             withCredentials: true,
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //         })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log(response.data.user)
    //                 globalContext.setUser(response.data.user)
    //                 navigate('/dashboard')
    //             } else {
    //                 throw new Error()
    //             }
    //         })
    //         .catch((error) => {
    //             setError('Incorrect details')
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }

//     return (
//         <div className="page-login">
//             <h1 className="title">Login</h1>

//             {error && error}

//             <input
//                 type="text"
//                 name="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />

//             <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />

//             <Button text="Login" loading={loading} onClick={submitForm} />
//         </div>
//     )
// }

// export default Login

// class Login extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             fields: {},
//             errors: {}
//         }
//     }



   

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