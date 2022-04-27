import Home from ".";
import React, { createRef } from "react";
import { Button } from 'reactstrap';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { Col, Row, Form } from "react-bootstrap";


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            page: 1
        };
    }
    async componentDidMount() {
        fetch(`http://localhost:5000/users/${parseInt((this.state.page - 1) * 10)}/10`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    DataisLoaded: true,
                    items: json
                });
            })
    }
    Incrementpage = async () => {
        if (this.state.page < 4) {
            await this.setState({ page: this.state.page + 1 });
            await this.componentDidMount()
        }
    }
    Decreasepage = async () => {
        if (this.state.page > 1) {
            await this.setState({ page: this.state.page - 1 });
            await this.componentDidMount()
        }
    }

    render() {
        const { DataisLoaded, items } = this.state;

        if (!DataisLoaded) return <div>
            <h1> Loading.... </h1> </div>;

        return (

            <div>
                <Home />
                <div >
                    <div>
                        <h1> Users </h1>
                    </div>

                    <div className="container-body">



<div style={{ padding: 20 }} >

    <Row xs={1} md={3}>

                        {
                            items.map((item) => (
                                <Col>
                                            <Card className="mb-3" key={item.user_id} style={{ padding: 0 }}>
                                                <Card.Body style={{ padding: 5 }}>
                                                <a href= {`/users/${item.user_id}`}>
                                                    <Card.Header>
                                                        {item.display_name}
                                                    </Card.Header>
                                                    </a>
                                                    &nbsp;
                                                    <Card.Text>
                                                        <h5>
                                                        {item.reputation}
                                                        
                                                        </h5>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <h5>
                                                        
                                                        joined on {item.creation_date}
                                                        </h5>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                
                                
                            ))
                        }
                        </Row>

                        </div>

                    <left>
                        <Button onClick={this.Decreasepage} >
                            Previous Page
                        </Button>
                    </left>
                    <right>
                        <Button onClick={this.Incrementpage}>
                            Next Page
                        </Button>
                    </right>

                </div>
                </div>

                <style jsx>{`
				

				// #pagenum{
				// 	float: right;
				// 	right: 10px;
				// 	top: 20px;
				// }

				h1,h4{
					text-align: center;
				}
                .container-body{
                    padding-left: 300px;
                    padding-top: 20px;
                    // position: fixed;
                    z-index: 10;
                    // box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
                }

				main{
					text-align: center;
					z-index: 1;
				}
				.boxed {
					z-index: 1;
					width: 800px;
					padding: 40px;
					text-align: center;
				} 
				.boxhead {
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

export default Users;
