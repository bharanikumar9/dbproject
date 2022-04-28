import Home from ".";
import React, { createRef } from "react";
import { Button } from 'reactstrap';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { Col, Row, Form } from "react-bootstrap";

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            page: 1
        };
    }
    async componentDidMount() {
        fetch(`http://localhost:5000/tags/${parseInt((this.state.page - 1) * 10)}/20`)
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
                        <h1> Tags </h1>
                    </div>

                    <div className="container-body">



                        <div style={{ padding: 20 }} >

                            <Row xs={1} md={3}>
                                {

                                    items.map((item) => (
                                        <Col>
                                            <Card className="mb-3" key={item.tag_id} style={{ padding: 0 }}>
                                                <Card.Body style={{ padding: 5 }}>
                                                <a href={`/tags/${item.tag_id}`}>

                                                    <Card.Header>
                                                        {item.tag_name}
                                                    </Card.Header>
                                                    </a>
                                                    &nbsp;
                                                    <Card.Text>
                                                        <h5>
                                                            related to course #{item.course_id}
                                                        </h5>
                                                        <h5>
                                                            tagged {item.count} times
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
                            <Button variant="primary" onClick={this.Decreasepage} >
                                Previous Page
                            </Button>
                        </left>
                        <right>
                            <Button variant="primary" onClick={this.Incrementpage}>
                                Next Page
                            </Button>
                        </right>

                    </div>
                </div>



                <style jsx>{`
            

                    h1,h4{
                        text-align: center;
                    }
                    a:link{
                        text-decoration: none!important;
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
        )
    }
}
export default Tags;
