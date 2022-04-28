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

                                    <Card.Subtitle className="mb-2 text-muted">posted on {item.date} by {item.display_name}</Card.Subtitle>

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

                                    <Card.Subtitle className="mb-2 text-muted">posted on {item.date} by {item.display_name}</Card.Subtitle>

                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                    </Card.Text>
                                    <FiThumbsUp /> {item.upvotes} <FiThumbsDown /> {item.downvotes}

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
                                                        <Card.Subtitle className="mb-2 text-muted">   -{comment.display_name} on {comment.date} </Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ) : null)}
                                    </div>

                                    <Card style={{ marginLeft: '20px' }}>
                                        <Card.Body style={{ padding: '30px' }}>
                                            <Card.Text>
                                                <div class="form-group shadow-textarea">
                                                    <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                                    <Button style={{ marginTop: '20px' }} variant="success">Add Comment</Button>
                                                </div>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Card.Footer>
                            </Card>

                        </div>

                    ))

                }


                <Card style={{ marginLeft: '350px' }}>
                    <Card.Body style={{ padding: '30px' }}>
                        <Card.Text>
                            {/* <div class="col-md-2">
        
        <div class="md-form">
            <textarea type="text" id="textarea" class="md-textarea" rows="4" cols="80"></textarea>
            <Button style={{ marginLeft: '20px' }} variant="success">Add Answer</Button>
        </div>
    </div> */}


                            <div class="form-group shadow-textarea">
                                <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                <Button style={{ marginTop: '20px' }} variant="success">Add Answer</Button>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>

                <div class="container">

                </div>


            </div>

            <style jsx>{`

input {
    
    line-height:10px
}

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
        textarea.md-textarea-scroll{
            overflow-y: visible;
          }
          textarea.md-textarea {
            padding: 0;
            resize: none;
            min-height: 3rem;
          }

          ::-webkit-scrollbar {
            width: 8px;
        }
        /* Track */
        
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            -webkit-border-radius: 10px;
            border-radius: 10px;
        }
        /* Handle */
        
        ::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: #your-color;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        }
        
        ::-webkit-scrollbar-thumb:window-inactive {
           background: #your-color;
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

        .btn{
            padding: 10px;
            border: 1px solid #d8d8d8;
            border-radius: 3px;
          }

        .btn:hover {
            color: black;
        }
        `}</style>

        </div >
    )
}

export default QuestionDetails;
