import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";


import { useNavigate } from 'react-router-dom'
import Home from '.';
// import GlobalContext from './GlobalContext.js'
const axios = require('axios')

const Search = () => {
    // const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [items, setitems] = useState([]);
    const [error, setError] = useState()
    const [searchstr, setsearch] = useState("")


    const submit = () => {
        let ar = searchstr
        let arr = ar.trim().split(" ")
        let data = []
        arr.forEach(element => {
            if (element.length > 2) {
                data.push(element)
            }
        });
        console.log(data)

        axios
            .post('http://localhost:5000/searchwithtag', {
                tags: data
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response.data);
                    setitems(response.data)
                    //    window.location.reload(false)

                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                //    console.log(error)
                //    alert("login to add answer")

                console.error(`Couldn't log the user out: ${error}`)
            })

    }


    return (






        <div>
            <Home />
            <div className="container-body">



                <Card style={{ marginLeft: '0px', padding: '25px' }}>


                    <h2> Search Questions </h2>



                    <Card.Body style={{ padding: '30px' }}>
                        <Card.Text>




                            <div class="form-group shadow-textarea">
                                <textarea value={searchstr} onChange={(e) => setsearch(e.target.value)}
                                    class="form-control z-depth-2" id="exampleFormControlTextarea6" rows="2" placeholder="Type something to search..."></textarea>
                            </div>

                            &nbsp;





                            <Button onClick={submit} style={{ marginTop: '20px' }} loading={loading} variant="success">search</Button>
                        </Card.Text>
                    </Card.Body>

                </Card>
                <div style={{ paddingLeft: 30,paddingTop: 30, }} >
                    <h4 >
                        Matched questions
                    </h4>
                </div>

                    {
                        items.map((item) => (
                            <div style={{ padding: 30 }} >

                                <Card style={{ marginLeft: '0px', marginRight: '100px' }}>
                                    <Card.Body>
                                        <a href={`/questions/${item.question_id}`}>

                                            <Card.Title>
                                                {item.title}
                                            </Card.Title>
                                        </a>

                                        <Card.Subtitle className="mb-2 text-muted">posted on {item.creation_date} by {item.display_name}</Card.Subtitle>

                                        {/* <Button size="sm" variant="outline-info">{item.tag_1}</Button>{' '}
                                    {item.tag_2 ? <Button size="sm" variant="outline-info">{item.tag_2}</Button> : null}{' '}
                                    {item.tag_3 ? <Button size="sm" variant="outline-info">{item.tag_3}</Button> : null}{' '}
                                    {item.tag_4 ? <Button size="sm" variant="outline-info">{item.tag_4}</Button> : null}{' '}
                                    {item.tag_5 ? <Button size="sm" variant="outline-info">{item.tag_5}</Button> : null}{' '}
                                    {item.tag_6 ? <Button size="sm" variant="outline-info">{item.tag_6}</Button> : null}{' '} */}


                                        <Card.Text>
                                            {/* {parse(item.body)} */}
                                            <FiThumbsUp /> {item.upvotes} <FiThumbsDown /> {item.downvotes}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>

                        ))
                    }



                </div>

                <style jsx>{`
				

				

				h1,h2,h3,h4{
                    // text-align: center
				}

                .container-body{
                    padding-left: 350px;
                    padding-top: 60px;
                    // position: fixed;
                    z-index: 10;
                    // box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
                }

				main{
					text-align: center;
					z-index: 1;
				}
                a{
                    text-decoration: none;
                }
				left {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
					left: 10px;
					bottom: 20px;
				}
				right {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
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

            export default Search;  