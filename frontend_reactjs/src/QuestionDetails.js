import React, { useState, useEffect } from 'react';
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


function QuestionDetails() {
    let { question_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    const [info, setInfo] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/questions/${question_id}`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
    }, [])




    return (
        <div>
            <Home />
            <div >

                {
                    info.map((item) => (
                        <div>
                            <Card style={{ marginLeft: '350px' }}>
                                <Card.Body>
                                    <a href={`/questions/${item.question_id}`}>

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
                                        {parse(item.body)}
                                        upvotes {item.upvotes} downvotes {item.downvotes}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))

                }


            </div>

            <style jsx>{`


        // #pagenum{
        // 	float: right;
        // 	right: 10px;
        // 	top: 20px;
        // }

        h1, h2, h3, h4{
            text - align: center;
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

export default QuestionDetails;
