import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Home from ".";
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";


function QuestionDetails() {
    let { question_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    const [info, setInfo] = useState([{}]);
    const [answers, setanswers] = useState([{}]);
    const [comments, setcomments] = useState([{}]);

    useEffect(() => {
        const api1 = `http://localhost:5000/questions/${question_id}`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:5000/answers/${question_id}`).then(res => {
            setanswers(res.data);
            console.log(res);

        }).catch(err => console.log(err));

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/comments/${question_id}`).then(res => {
            setcomments(res.data);
            console.log(res);

        }).catch(err => console.log(err));

    }, [])
    return (
        <div>
            <Home />
            <div className="container-body">
                {
                    info.map((item) => (
                        <div>
                            <Card style={{ marginLeft: '350px' }} >
                                <Card.Body>
                                    <a style={{ textDecoration: 'none' }} href={`/questions/${question_id}`}>

                                        <Card.Title>
                                            {item.title}
                                        </Card.Title>
                                    </a>

                                    <Card.Subtitle className="mb-2 text-muted">posted on {item.creation_date} by {item.display_name}</Card.Subtitle>

                                    <Button size="sm" variant="outline-info">{item.tag_1}</Button>{' '}
                                    {item.tag_2 ? <Button size="sm" variant="outline-info">{item.tag_2}</Button> : null}{' '}
                                    {item.tag_3 ? <Button size="sm" variant="outline-info">{item.tag_3}</Button> : null}{' '}
                                    {item.tag_4 ? <Button size="sm" variant="outline-info">{item.tag_4}</Button> : null}{' '}
                                    {item.tag_5 ? <Button size="sm" variant="outline-info">{item.tag_5}</Button> : null}{' '}
                                    {item.tag_6 ? <Button size="sm" variant="outline-info">{item.tag_6}</Button> : null}{' '}


                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                        <FiThumbsUp /> {item.upvotes} <FiThumbsDown /> {item.downvotes}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))

                }



                {
                    answers.map((item) => (
                        <div style={{ padding: 30 }} >
                            <Card style={{ marginLeft: '350px', padding: '25px' }}>
                                <Card.Body>

                                    <Card.Subtitle className="mb-2 text-muted">posted on {item.creation_date} by {item.display_name}</Card.Subtitle>

                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                        <FiThumbsUp /> {item.upvotes} <FiThumbsDown /> {item.downvotes}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>

                                    <div style={{ padding: 0 }} >

                                        {comments.map((comment) => comment.answer_id == item.answer_id ? (
                                            <div style={{ padding: -0 }} >
                                                <Card style={{ marginLeft: '20px' }}>
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {comment.body ? parse(comment.body) : null}
                                                        </Card.Text>
                                                        <Card.Subtitle className="mb-2 text-muted">   -{comment.display_name} on {comment.creation_date} </Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ) : null)}
                                    </div>
                                </Card.Footer>
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
            padding-left: 0px;
            padding-top: 60px;
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

        </div >
    )
}

export default QuestionDetails;