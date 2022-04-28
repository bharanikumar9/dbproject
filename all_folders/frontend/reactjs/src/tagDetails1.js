import React, { useState, useEffect } from 'react';
import Home from ".";
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import ReactHtmlParser from 'react-html-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"


import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
} from "react-router-dom";


function TagDetails1() {
    let { tag_name } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    const [info, setInfo] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/tagsname/${tag_name}`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
    }, [])

    const [info1, setInfo1] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/tagsname1/${tag_name}`;
        fetchdata(api1).then(data => {
            setInfo1(data)
        })
    }, [])


    return (
        <div>
            <Home />
            <div className="container-body">{
                    info1.map((item) => (
                           
                                <h2>
                                    {item.tag_name}
                                </h2>
                                   

                                    
                                
                    ))

                }




                {
                    info.map((item) => (
                        <div>
                            <Card style={{ marginLeft: '0px' }}>
                                <Card.Body>
                                <a href={`/questions/${item.question_id}`}>
                                    <Card.Title>
                                        {item.title}
                                    </Card.Title>
</a>
                                    <Card.Subtitle className="mb-2 text-muted">posted on {item.date} by {item.display_name}</Card.Subtitle>

                                   

                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                        upvotes {item.upvotes} downvotes {item.downvotes}
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />

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
                    a:link{
                        text-decoration: none!important;
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

export default TagDetails1;