import React, { useState, useEffect } from "react";
import Home from ".";
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

function Ask_question() {

    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }

    const [info2, setInfo2] = useState([{}]);
    const [data, setdata] = useState([]);
    const [tagdata, settagdata] = useState({
        tag_name: '',
        
    });
    const [user_reputation, setuser_reputation] = useState([]);
    const [errors, seterros] = useState({})
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        tag_1: '',
        tag_2: '',
        tag_3: '',
        tag_4: '',
        tag_5: '',
        tag_6: '',
    })
    useEffect(() => {
        const api1 = `http://localhost:5000/tags`;
        fetchdata(api1).then(data => {
            setInfo2(data)
            console.log(data)
            let coin = []
            data.forEach(element => {
                coin.push(element.tag_name)
            });
            setdata(coin)
        })
        const api2 = `http://localhost:5000/users/`;
        fetchdata(api2).then(data => {
            setInfo2(data)
            console.log(data)
            let coin = []
            data.forEach(element => {
                coin.push(element.tag_name)
            });
            setdata(coin)
        })
        axios.get('http://localhost:5000/fetch-user-reputation/', {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => {
            // console.log(res)
            // setuser_id(res.data[0].user_id)
            // console.log("user_id")
            // console.log(user_id)

            console.log("res")
            console.log(res)
            setuser_reputation(res.data[0].reputation)
            console.log("reputation")
            console.log(user_reputation)
        }).catch(err => console.log(err));
    }, [])




    const handleValidation = () => {
        let fields = formData;
        let errors = {};
        let formIsValid = true;

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Cannot be empty";
        }



        if (!fields["body"]) {
            formIsValid = false;
            errors["body"] = "Cannot be empty";
        }



        if (!fields["tag_1"]) {
            formIsValid = false;
            errors["tag_1"] = "Cannot be empty";
        }
        console.log(data)
        if (!data.includes(fields['tag_1'])) {
            errors["tag_1"] = "tag_1 must be a valid tag";
        }

        if (fields['tag_2'] != "" && !data.includes(fields['tag_2'])) {
            formIsValid = false;
            errors["tag_2"] = "tag_2 is not valid tag";
        }
        if (fields['tag_3'] != "" && !data.includes(fields['tag_3'])) {
            formIsValid = false;
            errors["tag_3"] = "tag_3 is not valid tag";
        }
        if (fields['tag_4'] != "" && !data.includes(fields['tag_4'])) {
            formIsValid = false;
            errors["tag_4"] = "tag_4 is not valid tag";
        }
        if (fields['tag_5'] != "" && !data.includes(fields['tag_5'])) {
            formIsValid = false;
            errors["tag_5"] = "tag_5 is not valid tag";
        }
        if (fields['tag_6'] != "" && !data.includes(fields['tag_6'])) {
            formIsValid = false;
            errors["tag_6"] = "tag_6 is not valid tag";
        }


        seterros(errors)
        return formIsValid;
    }


    const contactSubmit = () => {
        console.log(formData);
        if (handleValidation()) {
            // setLoading(true)
            //   setFormData({ ...formData, body:formData.body+"\n"})  
            axios
                .post('http://localhost:5000/user_posted_question', formData, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data)
                        window.location.reload(false)

                    } else {
                        throw new Error()
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            //     .finally(() => {
            //         setLoading(false)
            //     })   
        }
    }

    const tagSubmit = () => {
        console.log(tagdata);
        axios
            .post('http://localhost:5000/createtag', tagdata, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    window.location.reload(false)

                } else {
                    throw new Error()
                }
            })
            .catch((error) => {
                console.log(error)
            })
        
    }


    return (
        <div>
            <Home />
            <div className="container-body">

                <h2>Ask a public question</h2>
            </div>


            <div>
                <Card style={{ marginLeft: '350px', padding: '25px' }}>





                    <Card.Body style={{ padding: '30px' }}>
                        <Card.Text>
                            <label for="exampleFormControlTextarea6" >Title</label>

                            <div class="form-group shadow-textarea">
                                <textarea onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    value={formData.title} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                            </div>




                            <label for="exampleFormControlTextarea6">Body</label>

                            <div class="form-group shadow-textarea">
                                <textarea onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                    value={formData.body} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="8" placeholder="Write something here..."></textarea>
                            </div>


                            <br>
                            </br>

                            {user_reputation >  1000 ? (
                                <div>
                                    <label for="ice-cream-choice">You can add a new tag here</label>
                                    {/* <br></br> */}
                                    &nbsp;
                                    <input onChange={(e) => settagdata({ ...tagdata, tag_name: e.target.value })}
                                        value={tagdata.tag_name} id="ice-cream-choice" name="ice-cream-choice" size="35" />
                                    {/* <br></br> */}
                                    {/* &nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                                    <Button onClick={tagSubmit} style={{ marginLeft: '20px' }}  variant="success">Create tag</Button>


                                </div>
                                    

                            ) : null}

                            <br></br>

                            <label for="ice-cream-choice">Tag_1:</label>
                            &nbsp;
                            <input onChange={(e) => setFormData({ ...formData, tag_1: e.target.value })}
                                value={formData.tag_1} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />
                            &nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label for="ice-cream-choice">Tag_2:</label>
                            &nbsp;
                            <input onChange={(e) => setFormData({ ...formData, tag_2: e.target.value })}
                                value={formData.tag_2} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />


                            <br />
                            <br />
                            <label
                                for="ice-cream-choice">Tag_3:</label>
                            &nbsp;


                            <input value={formData.tag_3} onChange={(e) => setFormData({ ...formData, tag_3: e.target.value })} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />
                            &nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label for="ice-cream-choice">Tag_4:</label>

                            <input onChange={(e) => setFormData({ ...formData, tag_4: e.target.value })}
                                value={formData.tag_4} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />


                            <br />
                            <br />
                            <label for="ice-cream-choice">Tag_5:</label>
                            &nbsp;


                            <input onChange={(e) => setFormData({ ...formData, tag_5: e.target.value })}
                                value={formData.tag_5} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />
                            &nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label for="ice-cream-choice">Tag_6:</label>
                            &nbsp;
                            <input onChange={(e) => setFormData({ ...formData, tag_6: e.target.value })}
                                value={formData.tag_6} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35" />

                            <datalist id="ice-cream-flavors">



                                {
                                    info2.map((item) => (


                                        <option value={item.tag_name} />

                                    ))
                                }


                            </datalist>

                            <br />



                            <Button onClick={contactSubmit} style={{ marginTop: '20px' }} variant="success">Submit</Button>
                        </Card.Text>
                    </Card.Body>

                    <span className="error">{errors["title"]}</span>
                    <span className="error">{errors["body"]}</span>

                    <span className="error">{errors["tag_1"]}</span>
                    <span className="error">{errors["tag_2"]}</span>
                    <span className="error">{errors["tag_3"]}</span>
                    <span className="error">{errors["tag_4"]}</span>
                    <span className="error">{errors["tag_5"]}</span>
                    <span className="error">{errors["tag_6"]}</span>

                </Card>

            </div>

            <style jsx>{`
				

				

				h1,h2,h3,h4{
					// text-align: center;
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
    );
}


export default Ask_question;