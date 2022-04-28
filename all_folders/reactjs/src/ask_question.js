import React, { createRef } from "react";
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

class Ask_question extends React.Component {

    // async componentDidMount() {
    //     fetch(`http://localhost:5000/`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             this.setState({
    //                 DataisLoaded: true,
    //                 items: json
    //             });
    //         })
    // }


    render() {


        return (
            <div>
                <Home />
                <div className="container-body">

                    <h5>Form to ask questions</h5>

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




<label for="exampleFormControlTextarea6">Tags</label>
            
                                                        <div class="form-group shadow-textarea">
  <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="1" placeholder="Write something here..."></textarea>
</div>


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
}

export default Ask_question;
