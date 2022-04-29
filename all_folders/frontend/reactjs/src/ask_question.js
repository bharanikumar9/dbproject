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

function Ask_question()  {

    let { user_id } = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }

    const [info2, setInfo2] = useState([{}]);
    useEffect(() => {
        const api1 = `http://localhost:5000/tags`;
        fetchdata(api1).then(data => {
            setInfo2(data)
        })
    }, [])




        return (
            <div>
                <Home />
                <div className="container-body">


                </div>
                <div>
                <Card style={{ marginLeft: '350px', padding: '25px' }}>
                          

        

                                 
                                                    <Card.Body style={{ padding:'30px'}}>
                                                        <Card.Text>
                                                        <label for="exampleFormControlTextarea6">Title</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
</div>




<label for="exampleFormControlTextarea6">Body</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="8" placeholder="Write something here..."></textarea>
</div>



{/* 
<label for="exampleFormControlTextarea6">Tag_1</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>



<label for="exampleFormControlTextarea6">Tag_2</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>


<label for="exampleFormControlTextarea6">Tag_3</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>


<label for="exampleFormControlTextarea6">Tag_4</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>


<label for="exampleFormControlTextarea6">Tag_5</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>


<label for="exampleFormControlTextarea6">Tag_6</label> */}
            
                                                        {/* <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div> */}
<br/>
<label for="ice-cream-choice">Tag_1:</label>
&nbsp;
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>
&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<label for="ice-cream-choice">Tag_2:</label>
&nbsp;
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>

<br/>
<br/>
<label for="ice-cream-choice">Tag_3:</label>
&nbsp;


<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>
&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<label for="ice-cream-choice">Tag_4:</label>

<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>


<br/>
<br/>
<label for="ice-cream-choice">Tag_5:</label>
&nbsp;


<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>
&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<label for="ice-cream-choice">Tag_6:</label>
&nbsp;
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" size="35"/>

<datalist id="ice-cream-flavors">
     


{
                    info2.map((item) => (
            
                          
                          <option value={item.tag_name}/>
                    
                    ))
                }
   

</datalist>

<br/>



                                               <Button style={{ marginTop: '20px' }} variant="success">Submit</Button>                                
                                                        </Card.Text>
                                                    </Card.Body>
                                    
                
                            </Card>

                </div>

                <style jsx>{`
				

				

				h1,h2,h3,h4{
					text-align: center;
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
