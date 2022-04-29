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
import { CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";


function QuestionDetails() {
    let { question_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    const [info, setInfo] = useState([{}]);
    const [tem, settem] = useState(-1);
    const [answers, setanswers] = useState([{}]);
    const [questioncomments, setquestioncomments] = useState([{}]);
    const [answercomments, setanswercomments] = useState([{}]);
    const [answerlikes, setanswerlikes] = useState({
    });
    const [loading, setLoading] = useState(false);
    const [like, setliked] = useState(2);
    const [newanswer, setnewanswer] = useState("");
    const [newcommentq, setnewcommentqf] = useState("");
    const [newcomments, setnewcomments] = useState({
        'user': "bh"
    });


    useEffect(() => {
        const api1 = `http://localhost:5000/questions/${question_id}`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:5000/user_liked_questions/${question_id}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => {

            if (res.data.length != 0) {
                console.log(res.data[0].like_type)
                setliked(res.data[0].like_type)
            }
        }).catch(err => console.log(err));

    }, [])



    useEffect(() => {
        axios.get(`http://localhost:5000/answers/${question_id}`).then(res => {
            setanswers(res.data);
            console.log(res);
            const c = res.data;
            let fields = answerlikes
            c.forEach(element => {
                // console.log(element)
                // console.log(fields)
                fields[element.answer_id] = 2;
            })
            setanswerlikes(fields);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(answerlikes)

        }).then(() => {
            axios.get(`http://localhost:5000/user_liked_answers/${question_id}`, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(res => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(res.data);
                const coin = res.data;
                let fields = answerlikes;
                coin.forEach(element => {
                    fields[element.answer_id] = element.like_type;
                })
                fields[tem] = 0
                settem(tem-1)
                setanswerlikes(fields);
                console.log(answerlikes)
            }).catch(err => console.log(err));


        });

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/questioncomments/${question_id}`).then(res => {
            setquestioncomments(res.data);
            console.log(res);

        }).catch(err => console.log(err));

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/answercomments/${question_id}`).then(res => {
            setanswercomments(res.data);
            console.log(res);

        }).catch(err => console.log(err));

    }, [])


    const addanswer = () => {
        setLoading(true)
        console.log(newanswer)
        if (newanswer == "") {
            setLoading(false)
            return
        }

        axios
            .post('http://localhost:5000/user_answered_question', {
                question_id: question_id,
                body: newanswer,
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response);
                    window.location.reload(false)

                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                alert("login to add answer")

                console.error(`Couldn't log the user out: ${error}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const addcomment = (ansid) => {
        setLoading(true)
        console.log(ansid)
        console.log(newcomments[ansid])
        if (!newcomments[ansid] || newcomments[ansid] == "") {
            console.log("empty")
            return
        }
        console.log(ansid)

        axios
            .post('http://localhost:5000/user_commented_answer', {
                answer_id: ansid,
                body: newcomments[ansid],
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response);
                    window.location.reload(false)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                alert("login to add comments")

                console.error(`Couldn't log the user out: ${error}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const addcommentquestion = () => {
        setLoading(true)
        console.log(newcommentq)
        if (newcommentq == "") {
            console.log("empty")
            return
        }

        axios
            .post('http://localhost:5000/user_commented_question', {
                question_id: question_id,
                body: newcommentq,
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response);
                    window.location.reload(false)
                } else {
                    console.log("*****************")
                    alert("login to add comments")
                    throw new Error()
                }
            })
            .catch((error) => {
                alert("login to add comments")

                console.error(`Couldn't log the user out: ${error}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleChange = (field, e) => {
        let fields = newcomments;
        console.log(fields)
        fields[field] = e.target.value;
        setnewcomments(fields);
    }
    const handlelike = (e) => {

        console.log(e)
        setliked(e)
        let a = info
        if(e==1)
        a[0].upvotes+=1
        else 
        a[0].downvotes+=1
        setInfo(a)
        console.log(info)
        axios
            .post('http://localhost:5000/user_liked_question', {
                question_id: question_id,
                like_type: e,
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response);
                    // window.location.reload(false)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                alert("login to like")

                console.error(`Couldn't liket: ${error}`)
            })

    }
    const handlelikea = (e, ansid) => {

        // answers.forEach(element => {
        //            if(element.answer_id == ansid){
        //                answer
        //            }

    
        // });
        console.log(answerlikes[ansid])
        console.log(answerlikes)
        console.log("WW")
        let id = answerlikes
        id[ansid] = e
        id[tem]=0
        settem(tem-1)
        setanswerlikes(id);
        setanswerlikes(answerlikes);

        
        axios
            .post('http://localhost:5000/user_liked_answer', {
                answer_id: ansid,
                like_type: e,
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response);
                    window.location.reload(false)
                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                console.error(`Couldn't liket: ${error}`)
            })

    }
    return (
        <div>
            <Home />
            <div className="container-body">
                {
                    info.map((item) => (
                        <div>
                            <Card style={{ marginRight: '10px' }} >
                                <Card.Body>
                                    <a style={{ textDecoration: 'none' }} href={`/questions/${question_id}`}>

                                        <Card.Title>
                                            {item.title}
                                        </Card.Title>
                                    </a>

                                    <Card.Subtitle className="mb-2 text-muted">-{item.display_name} on {item.date} </Card.Subtitle>

                                    <Button href={`/tagname/${item.tag_1}`} size="sm" variant="outline-info">{item.tag_1}</Button>{' '}
                                    {item.tag_2 ? <Button href={`/tagname/${item.tag_2}`} size="sm" variant="outline-info">{item.tag_2}</Button> : null}{' '}
                                    {item.tag_3 ? <Button href={`/tagname/${item.tag_3}`} size="sm" variant="outline-info">{item.tag_3}</Button> : null}{' '}
                                    {item.tag_4 ? <Button href={`/tagname/${item.tag_4}`} size="sm" variant="outline-info">{item.tag_4}</Button> : null}{' '}
                                    {item.tag_5 ? <Button href={`/tagname/${item.tag_5}`} size="sm" variant="outline-info">{item.tag_5}</Button> : null}{' '}
                                    {item.tag_6 ? <Button href={`/tagname/${item.tag_6}`} size="sm" variant="outline-info">{item.tag_6}</Button> : null}{' '}


                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                        <br></br>
                                        <button
                                            style={{ color: like == 1 ? 'green' : 'grey', backgroundColor: 'transparent', border: 'none' }}
                                            variant="contained" color="success"
                                            disabled={like == 2 ? false : true}
                                            onClick={() => handlelike(1)}

                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                                style={{ paddingRight: 5 }}
                                            />
                                        </button>
                                        {item.upvotes}
                                        <button
                                            style={{ color: like == 0 ? 'red' : 'grey', backgroundColor: 'transparent', border: 'none' }}
                                            variant="contained" color="success"
                                            disabled={like == 2 ? false : true}
                                            onClick={() => handlelike(0)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsDown}
                                                style={{ paddingRight: 5 }}
                                            />
                                        </button>
                                        {item.downvotes}
                                    </Card.Text>
                                </Card.Body>

                                <Card.Footer>
                                    <div style={{ padding: 0 }} >
                                        <h5>Question comments</h5>
                                        {questioncomments.map((comment) => comment.question_id == item.answer_id ? (
                                            <div style={{ padding: '3px' }} >
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
                                </Card.Footer>
                                <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '5px' }}>
                                    <Card.Body style={{ padding: '10px' }}>
                                        <Card.Text>
                                            <div class="form-group shadow-textarea">
                                                <textarea onChange={(e) => setnewcommentqf(e.target.value)} value={newcommentq} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                                <Button style={{ marginTop: '20px' }} onClick={() => addcommentquestion()} variant="success">Add Comment</Button>
                                            </div>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Card>
                        </div>
                    ))

                }


                <h5 >Answers</h5>

                {
                    answers.map((item) => (
                        <div >
                            <Card style={{ padding: '10px' }}>
                                <Card.Body>

                                    <Card.Subtitle className="mb-2 text-muted">-{item.display_name} on {item.date} </Card.Subtitle>

                                    <Card.Text>
                                        {item.body ? parse(item.body) : null}
                                    </Card.Text>
                                <button
                                        style={{ color: answerlikes[item.answer_id] == 1 ? 'green' : 'grey', backgroundColor: 'transparent', border: 'none' }}
                                        variant="contained" color="success"
                                        disabled={(answerlikes[item.answer_id] == 2) ? false : true}
                                        onClick={() => handlelikea(1, item.answer_id)}

                                    >
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            style={{ paddingRight: 5 }}
                                        />
                                    </button>
                                    {item.upvotes}
                                    <button
                                        style={{ color: answerlikes[item.answer_id] == 0 ? 'red' : 'grey', backgroundColor: 'transparent', border: 'none' }}
                                        variant="contained" color="success"
                                        disabled={(answerlikes[item.answer_id] == 2) ? false : true}
                                        onClick={() => handlelikea(0, item.answer_id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faThumbsDown}
                                            style={{ paddingRight: 5 }}
                                        />
                                    </button>
                                    {item.downvotes}
                                </Card.Body>
                                <Card.Footer>

                                    <div style={{ padding: 0 }} >

                                        {answercomments.map((comment) => comment.answer_id == item.answer_id ? (
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
                                                    <textarea onChange={handleChange.bind(this, `${item.answer_id}`)} value={newcomments[`${item.answer_id}`]} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                                    <Button style={{ marginTop: '20px' }} onClick={() => addcomment(item.answer_id)} variant="success">Add Comment</Button>
                                                </div>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Card.Footer>
                            </Card>

                        </div>

                    ))

                }


                <Card style={{}}>
                    <Card.Body style={{ padding: '10px' }}>
                        <Card.Text>
                            <div class="form-group shadow-textarea">
                                <textarea value={newanswer} onChange={(e) => setnewanswer(e.target.value)} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                <Button style={{ marginTop: '20px' }} onClick={addanswer} variant="success">Add Answer</Button>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>

            <style jsx>{`

                input {
                    
                    line-height:10px
                }
                h5 {
                    padding-top: 10px;
                    // padding-left: 30px;
                }
                h1, h2, h3, h4{
                    text - align: center;
                }
                .container-body{
                    padding-left: 350px;
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