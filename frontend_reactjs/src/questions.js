import React, { createRef } from "react";
import Home from ".";
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            page: 1
        };
    }
    async componentDidMount() {
        fetch(`http://localhost:5000/questions/${parseInt((this.state.page - 1) * 10)}/10`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    DataisLoaded: true,
                    items: json
                });
            })
    }
    Incrementpage = async () => {
        if (this.state.page < 50) {
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
                        <h3> All Questions </h3>
                    </div>

                    {
                        items.map((item) => (
                            <div style={{ padding: 30 }} >

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
                                            {/* {parse(item.body)} */}
                                            upvotes {item.upvotes} downvotes {item.downvotes}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>

                        ))
                    }

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

                <style jsx>{`
				

				// #pagenum{
				// 	float: right;
				// 	right: 10px;
				// 	top: 20px;
				// }

				h1,h2,h3,h4{
					text-align: center;
				}

				main{
					text-align: center;
					z-index: 1;
				}
                a{
                    text-decoration: none;
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

export default Questions;
