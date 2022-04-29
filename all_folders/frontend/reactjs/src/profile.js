import React, { useState, useEffect } from 'react'
import Home from "."
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

import { FiThumbsUp, FiThumbsDown,FiUser } from "react-icons/fi";
import { CardBody } from 'reactstrap'
function View_profile() {
    let { user_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    const [info1, setInfo1] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/user/${user_id}`;
        fetchdata(api1).then(data => {
            setInfo1(data)
        })
    }, [])

    const [info2, setInfo2] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/user_tags/${user_id}`;
        fetchdata(api1).then(data => {
            setInfo2(data)
        })
    }, [])

    const [info3, setInfo3] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/user_questions/${user_id}`;
        fetchdata(api1).then(data => {
            setInfo3(data)
        })
    }, [])





    return (
        <div>
            <Home />
            <div className="container-body">

                {
                    info1.map((item) => (
                        <div className="float-right">
                                               <a href='/editprofile'> <h3>Edit profile</h3> </a>

                           <Card style={{ marginRight: '200px' }}>
                                    <Card.Body>
                                        

                                            <Card.Title>
                                                <h1>{item.display_name}</h1>
                                            </Card.Title>
                                       

                                        <Card.Subtitle className="mb-2 text-muted">joined on {item.date} </Card.Subtitle>
                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                            <h2>About </h2>  {item.about ? parse(item.about) : null} 
                                        </Card.Text>

                                        <Card style={{width: '18rem' }}><CardBody>

                                        <Card.Title>
                                                <h3>Stats</h3>
                                            </Card.Title>
                                       
                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                            
                                            <h5>{item.upvotes}</h5> 
                                            <Card.Subtitle className="mb-2 text-muted"> upvotes </Card.Subtitle>
                                            &nbsp;
                                            <h5>{item.downvotes}</h5> 
                                            <Card.Subtitle className="mb-2 text-muted"> downvotes </Card.Subtitle>
                                          
                                        
                                        </Card.Text>
                                        <Card.Text>
                                        <h5>{item.reputation}</h5> 
                                            <Card.Subtitle className="mb-2 text-muted"> reputation </Card.Subtitle>
                                            &nbsp;
                                            <h5>{item.views}</h5> 
                                            <Card.Subtitle className="mb-2 text-muted"> views </Card.Subtitle> 
                                        </Card.Text>
                                </CardBody></Card>
                                    </Card.Body>
                                </Card>
                                    
                                   
                        </div>
                    ))

                    

                }

                <h2>Top Tags</h2>


                {
                    info2.map((item) => (
                        <div>
                           
                           <Card style={{  marginRight: '200px' }}>
                                    <Card.Body>
                                    <a href={`/tags/${item.tag_id}`}>
                                            <Card.Title>
                                                {item.tag_name}
                                            </Card.Title>
                                            </a>

                                        

                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                    
                                            posts {item.counts} 
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                                    
                    
                                   
                        </div>
                    ))
                }

                <h2>Top Questions</h2>


{
                    info3.map((item) => (
                        <div>
                           
                           <Card style={{  marginRight: '200px' }}>
                                    <Card.Body>
                                        
                                    <a href={`/questions/${item.question_id}`}>
                                            <Card.Title>
                                                {item.title}
                                            </Card.Title>
                                       </a>

                                        

                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                            creation on  {item.date} 
                                        </Card.Text>
                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                            views {item.view_count} 
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                                    
                    
                                   
                        </div>
                    ))
                }


            </div>

            <style jsx>{`
                h1, h2, h3, h4{
                    text - align: center;
                }
                .container-body{
                    padding-left: 350px;
                    padding-top: 70px;
                    // position: fixed;
                    z-index: 10;
                    // box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
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

        </div>
    )
}


export default View_profile;
